import { Router } from 'express';
import { body } from 'express-validator';
import { createPrediction, getPredictionHistory, getPredictionById, deletePrediction } from '../controllers/prediction.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.use(protect); // Protect all prediction endpoints

router.post(
  '/',
  [
    body('symptoms').isArray({ min: 1 }).withMessage('Symptoms must be an array with at least 1 symptom')
  ],
  createPrediction
);

router.get('/history', getPredictionHistory);
router.get('/:id', getPredictionById);
router.delete('/:id', deletePrediction);

export default router;
