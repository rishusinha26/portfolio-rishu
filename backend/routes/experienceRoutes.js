import express from 'express';
import {
  getAllExperiences,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience
} from '../controllers/experienceController.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllExperiences);
router.get('/:id', getExperience);

// Protected routes (admin only)
router.post('/', verifyToken, requireAdmin, createExperience);
router.put('/:id', verifyToken, requireAdmin, updateExperience);
router.delete('/:id', verifyToken, requireAdmin, deleteExperience);

export default router;
