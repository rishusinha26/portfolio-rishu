import express from 'express';
import {
  getContactConfigStatus,
  createMessage,
  getAllMessages,
  markAsRead,
  deleteMessage
} from '../controllers/messageController.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';
import { body } from 'express-validator';

const router = express.Router();

// Public route
router.get('/config-status', getContactConfigStatus);

router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').optional({ values: 'falsy' }).isLength({ min: 2, max: 150 }).withMessage('Subject must be between 2 and 150 characters'),
  body('message').trim().notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 5000 }).withMessage('Message must be between 10 and 5000 characters')
], createMessage);

// Protected routes (admin only)
router.get('/', verifyToken, requireAdmin, getAllMessages);
router.patch('/:id/read', verifyToken, requireAdmin, markAsRead);
router.delete('/:id', verifyToken, requireAdmin, deleteMessage);

export default router;
