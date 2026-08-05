import User from '../models/User.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import generateToken from '../utils/generateToken.js';
import { validationResult } from 'express-validator';

export const registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ApiError(400, 'Validation failed', errors.array()));
    }

    const { name, email, password, age, gender } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new ApiError(400, 'User with this email already exists'));
    }

    const user = await User.create({ name, email, password, age, gender });
    const token = generateToken(res, user._id);

    return res.status(201).json(
      new ApiResponse(201, {
        _id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        profileImage: user.profileImage,
        token
      }, 'User registered successfully')
    );
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ApiError(400, 'Validation failed', errors.array()));
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return next(new ApiError(401, 'Invalid email or password'));
    }

    const token = generateToken(res, user._id);

    return res.status(200).json(
      new ApiResponse(200, {
        _id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        profileImage: user.profileImage,
        token
      }, 'Login successful')
    );
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0)
    });

    return res.status(200).json(
      new ApiResponse(200, {}, 'Logged out successfully')
    );
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    return res.status(200).json(
      new ApiResponse(200, user, 'Current user profile fetched')
    );
  } catch (error) {
    next(error);
  }
};
