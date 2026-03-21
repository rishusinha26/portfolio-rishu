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

    // Save to database first to ensure message is not lost
    const newMessage = await Message.create({
      name,
      email,
      subject: subject || 'Portfolio Contact',
      message,
      status: 'pending' // Track email status
    });

    // Return success immediately so slow SMTP providers do not cause client timeouts.
    res.status(201).json({ 
      success: true, 
      message: 'Message received successfully. We will contact you soon.',
      delivery: isEmailConfigured() ? 'queued' : 'stored',
      data: newMessage 
    });

    // Process email delivery in background.
    setImmediate(async () => {
      const timeout = (ms) => new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Operation timed out')), ms));

      if (!isEmailConfigured()) {
        await Message.findByIdAndUpdate(newMessage._id, { status: 'email_failed' });
        console.warn('⚠️ Message stored but email service is not configured.');
        return;
      }

      try {
        await Promise.race([
          sendContactEmail(name, email, subject || 'Portfolio Contact', message),
          timeout(30000)
        ]);
        await Message.findByIdAndUpdate(newMessage._id, { status: 'completed' });
        console.log('✅ Admin notification email sent');
      } catch (emailError) {
        await Message.findByIdAndUpdate(newMessage._id, { status: 'email_failed' });
        console.error('❌ Failed to send admin notification email:', emailError);
      }

      // Best effort confirmation email.
      try {
        await Promise.race([
          sendConfirmationEmail(name, email, subject || 'Portfolio Contact'),
          timeout(20000)
        ]);
        console.log('✅ Confirmation email sent to user');
      } catch (confirmationError) {
        console.error('❌ Failed to send confirmation email to user:', confirmationError);
      }
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
