import User from '../models/User.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import { validationResult } from 'express-validator';

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    return res.status(200).json(
      new ApiResponse(200, user, 'Profile details retrieved successfully')
    );
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ApiError(400, 'Validation error', errors.array()));
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new ApiError(404, 'User not found'));
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.age = req.body.age || user.age;
    user.gender = req.body.gender || user.gender;

    if (req.body.profileImage) {
      user.profileImage = req.body.profileImage;
    }

    const updatedUser = await user.save();

    return res.status(200).json(
      new ApiResponse(200, {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        age: updatedUser.age,
        gender: updatedUser.gender,
        profileImage: updatedUser.profileImage
      }, 'Profile updated successfully')
    );
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ApiError(400, 'Validation error', errors.array()));
    }

    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (!user || !(await user.matchPassword(currentPassword))) {
      return next(new ApiError(400, 'Current password is incorrect'));
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json(
      new ApiResponse(200, {}, 'Password changed successfully')
    );
  } catch (error) {
    next(error);
  }
};
