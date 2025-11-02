import express from 'express';
import multer from 'multer';
import { uploadFile, deleteFile } from '../controllers/uploadController.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Protected routes (admin only)
router.post('/', verifyToken, requireAdmin, upload.single('file'), uploadFile);
router.delete('/', verifyToken, requireAdmin, deleteFile);

export default router;
