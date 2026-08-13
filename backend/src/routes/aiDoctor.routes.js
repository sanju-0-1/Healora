import express from 'express';
import {
  chatWithDoctor,
  getChatHistory,
  getChatSession,
  deleteChatSession,
  getAiDoctorStatus
} from '../controllers/aiDoctor.controller.js';
import { protect, optionalAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/status', getAiDoctorStatus);
router.post('/chat', optionalAuth, chatWithDoctor);

router.get('/history', protect, getChatHistory);
router.get('/history/:sessionId', protect, getChatSession);
router.delete('/history/:sessionId', protect, deleteChatSession);

export default router;
