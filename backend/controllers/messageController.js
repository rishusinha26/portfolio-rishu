import Message from '../models/Message.js';
import { sendContactEmail, sendConfirmationEmail, isEmailConfigured } from '../config/email.js';
import { validationResult } from 'express-validator';

export const getContactConfigStatus = async (req, res) => {
  try {
    res.json({
      success: true,
      configured: isEmailConfigured(),
      service: process.env.SMTP_HOST ? 'smtp' : 'gmail',
      hasAdminEmail: Boolean(process.env.ADMIN_EMAIL)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new message
export const createMessage = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0]?.msg || 'Validation failed';
      return res.status(400).json({
        success: false,
        message: firstError,
        errors: errors.array()
      });
    }

    const { name, email, subject, message } = req.body;

    if (!isEmailConfigured()) {
      return res.status(503).json({
        success: false,
        message: 'Contact email service is not configured on server. Please set EMAIL_USER/EMAIL_PASS or SMTP settings in backend .env.'
      });
    }

    // Save to database first to ensure message is not lost
    const newMessage = await Message.create({
      name,
      email,
      subject: subject || 'Portfolio Contact',
      message,
      status: 'pending' // Track email status
    });

    // Send emails with Promise.race to implement timeout
    const timeout = (ms) => new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Operation timed out')), ms));

    // Send email notification to admin with 30s timeout (required)
    try {
      await Promise.race([
        sendContactEmail(name, email, subject || 'Portfolio Contact', message),
        timeout(30000)
      ]);
      console.log('✅ Admin notification email sent');
      newMessage.status = 'completed';
      await newMessage.save();
    } catch (emailError) {
      console.error('❌ Failed to send admin notification email:', emailError);
      newMessage.status = 'email_failed';
      await newMessage.save();

      const rawError = String(emailError?.message || '');
      const needsAppPassword = rawError.includes('5.7.9') || rawError.toLowerCase().includes('application-specific password');
      const invalidLogin = rawError.includes('Invalid login') || rawError.includes('535-5.7.8') || rawError.includes('534-5.7.9');
      const timedOut = rawError.toLowerCase().includes('timed out') || rawError.toLowerCase().includes('timeout');

      return res.status(500).json({
        success: false,
        message: needsAppPassword
          ? 'Message saved, but Gmail requires an App Password. Set EMAIL_PASS to a Gmail App Password in Render env and redeploy.'
          : invalidLogin
            ? 'Message saved, but Gmail login failed. Re-enter EMAIL_USER/EMAIL_PASS in Render (no spaces), then redeploy backend.'
            : timedOut
              ? 'Message saved, but email provider timed out. Please retry in a minute and check Render outbound network status.'
              : 'Message saved, but email delivery failed. Verify EMAIL_USER/EMAIL_PASS and ADMIN_EMAIL in Render env, then redeploy backend.',
        error: process.env.NODE_ENV === 'development' ? emailError.message : undefined
      });
    }

    // Send confirmation email to user with 20s timeout (best effort)
    try {
      await Promise.race([
        sendConfirmationEmail(name, email, subject || 'Portfolio Contact'),
        timeout(20000)
      ]);
      console.log('✅ Confirmation email sent to user');
    } catch (confirmationError) {
      console.error('❌ Failed to send confirmation email to user:', confirmationError);
      // Continue even if confirmation email fails - admin notification is more important
    }

    res.status(201).json({ 
      success: true, 
      message: 'Message received successfully. We will contact you soon.',
      data: newMessage 
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all messages (admin only)
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mark message as read (admin only)
export const markAsRead = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete message (admin only)
export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
