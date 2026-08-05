import Prediction from '../models/Prediction.js';
import { analyzeSymptomsService } from '../services/prediction.service.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import { validationResult } from 'express-validator';

export const createPrediction = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ApiError(400, 'Validation failed', errors.array()));
    }

    const { symptoms } = req.body;

    const analysisResult = await analyzeSymptomsService(symptoms);

    const prediction = await Prediction.create({
      user: req.user._id,
      symptoms,
      predictedDisease: analysisResult.predictedDisease,
      confidence: analysisResult.confidence,
      severity: analysisResult.severity,
      doctorType: analysisResult.doctorType
    });

    return res.status(201).json(
      new ApiResponse(201, prediction, 'Prediction computed and saved successfully')
    );
  } catch (error) {
    next(error);
  }
};

export const getPredictionHistory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const history = await Prediction.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Prediction.countDocuments({ user: req.user._id });

    return res.status(200).json(
      new ApiResponse(200, {
        history,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / limit)
        }
      }, 'Prediction history retrieved')
    );
  } catch (error) {
    next(error);
  }
};

export const getPredictionById = async (req, res, next) => {
  try {
    const prediction = await Prediction.findOne({ _id: req.params.id, user: req.user._id });
    if (!prediction) {
      return next(new ApiError(404, 'Prediction record not found'));
    }
    return res.status(200).json(
      new ApiResponse(200, prediction, 'Prediction record retrieved')
    );
  } catch (error) {
    next(error);
  }
};

export const deletePrediction = async (req, res, next) => {
  try {
    const prediction = await Prediction.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!prediction) {
      return next(new ApiError(404, 'Prediction record not found'));
    }
    return res.status(200).json(
      new ApiResponse(200, {}, 'Prediction record deleted successfully')
    );
  } catch (error) {
    next(error);
  }
};
