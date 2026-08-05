import jwt from 'jsonwebtoken';

export const generateToken = (res, userId) => {
  const secret = process.env.JWT_SECRET || 'super_secret_jwt_key_medisense_2026';
  const token = jwt.sign({ id: userId }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  };

  res.cookie('token', token, cookieOptions);
  return token;
};

export default generateToken;
