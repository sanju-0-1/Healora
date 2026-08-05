import Disease from '../models/Disease.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import { validationResult } from 'express-validator';

export const getDiseases = async (req, res, next) => {
  try {
    const { search, severity, doctorType, page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { symptoms: { $regex: search, $options: 'i' } }
      ];
    }

    if (severity) {
      query.severity = severity;
    }

    if (doctorType) {
      query.doctorType = { $regex: doctorType, $options: 'i' };
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;
    const sortOrder = order === 'asc' ? 1 : -1;

    const diseases = await Disease.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limitNum);

    const total = await Disease.countDocuments(query);

    return res.status(200).json(
      new ApiResponse(200, {
        diseases,
        pagination: {
          total,
          page: pageNum,
          pages: Math.ceil(total / limitNum)
        }
      }, 'Diseases fetched successfully')
    );
  } catch (error) {
    next(error);
  }
};

export const getDiseaseById = async (req, res, next) => {
  try {
    const disease = await Disease.findById(req.params.id);
    if (!disease) {
      return next(new ApiError(404, 'Disease record not found'));
    }
    return res.status(200).json(
      new ApiResponse(200, disease, 'Disease details fetched')
    );
  } catch (error) {
    next(error);
  }
};

export const createDisease = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ApiError(400, 'Validation failed', errors.array()));
    }

    const disease = await Disease.create(req.body);
    return res.status(201).json(
      new ApiResponse(201, disease, 'Disease record created successfully')
    );
  } catch (error) {
    next(error);
  }
};

export const updateDisease = async (req, res, next) => {
  try {
    const disease = await Disease.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!disease) {
      return next(new ApiError(404, 'Disease record not found'));
    }
    return res.status(200).json(
      new ApiResponse(200, disease, 'Disease updated successfully')
    );
  } catch (error) {
    next(error);
  }
};

export const deleteDisease = async (req, res, next) => {
  try {
    const disease = await Disease.findByIdAndDelete(req.params.id);
    if (!disease) {
      return next(new ApiError(404, 'Disease record not found'));
    }
    return res.status(200).json(
      new ApiResponse(200, {}, 'Disease deleted successfully')
    );
  } catch (error) {
    next(error);
  }
};
