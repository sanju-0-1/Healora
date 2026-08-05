import { Router } from 'express';
import { body } from 'express-validator';
import { getDiseases, getDiseaseById, createDisease, updateDisease, deleteDisease } from '../controllers/disease.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getDiseases);
router.get('/:id', getDiseaseById);

// Protected administrative disease routes
router.post(
  '/',
  protect,
  [
    body('name').notEmpty().withMessage('Disease name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('symptoms').isArray({ min: 1 }).withMessage('Symptoms must be a non-empty array'),
    body('doctorType').notEmpty().withMessage('Doctor specialty type is required')
  ],
  createDisease
);

router.put('/:id', protect, updateDisease);
router.delete('/:id', protect, deleteDisease);

export default router;
