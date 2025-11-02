import Message from '../models/Message.js';
import { sendContactEmail, sendConfirmationEmail } from '../config/email.js';

// Create new message
export const createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Save to database
    const newMessage = await Message.create({
      name,
      email,
      subject: subject || 'Portfolio Contact',
      message
    });

    // Send email notification to admin
    try {
      await sendContactEmail(name, email, subject || 'Portfolio Contact', message);
      console.log('✅ Admin notification email sent');
    } catch (emailError) {
      console.error('❌ Failed to send admin notification email:', emailError);
      // Continue even if email fails
    }

    // Send confirmation email to user
    try {
      await sendConfirmationEmail(name, email, subject || 'Portfolio Contact');
      console.log('✅ Confirmation email sent to user');
    } catch (confirmationError) {
      console.error('❌ Failed to send confirmation email to user:', confirmationError);
      // Continue even if confirmation email fails - admin notification is more important
    }

    res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully',
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
