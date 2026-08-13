import express from 'express';
import {
  getAdminStats,
  getAllUsers,
  updateUserRole,
  deleteUser
} from '../controllers/admin.controller.js';
import { protect, adminAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

// Enforce authentication & admin role check on all admin routes
router.use(protect, adminAuth);

router.get('/stats', getAdminStats);
router.get('/users', getAllUsers);
router.patch('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

export default router;
