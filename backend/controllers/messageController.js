import Message from '../models/Message.js';
import { sendContactEmail, sendConfirmationEmail } from '../config/email.js';

// Create new message
export const createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

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

    // Send email notification to admin with 30s timeout
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
      // Continue even if email fails
    }

    // Send confirmation email to user with 20s timeout
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
