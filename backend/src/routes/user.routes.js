import { Router } from 'express';
import { body } from 'express-validator';
import { getUserProfile, updateUserProfile, changePassword } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.use(protect); // Protect all user routes

router.get('/profile', getUserProfile);

router.put(
  '/profile',
  [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Invalid email format')
  ],
  updateUserProfile
);

router.put(
  '/change-password',
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
  ],
  changePassword
);

export default router;
