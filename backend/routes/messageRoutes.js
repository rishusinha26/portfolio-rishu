import express from 'express';
import {
  createMessage,
  getAllMessages,
  markAsRead,
  deleteMessage
} from '../controllers/messageController.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';
import { body } from 'express-validator';

const router = express.Router();

// Public route
router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').trim().notEmpty().withMessage('Message is required')
], createMessage);

// Protected routes (admin only)
router.get('/', verifyToken, requireAdmin, getAllMessages);
router.patch('/:id/read', verifyToken, requireAdmin, markAsRead);
router.delete('/:id', verifyToken, requireAdmin, deleteMessage);

export default router;
