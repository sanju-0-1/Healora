import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import diseaseRoutes from './routes/disease.routes.js';
import predictionRoutes from './routes/prediction.routes.js';
import aiDoctorRoutes from './routes/aiDoctor.routes.js';
import adminRoutes from './routes/admin.routes.js';

import { notFound, errorHandler } from './middleware/error.middleware.js';


const app = express();

// Security Middlewares
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.'
  }
});
app.use('/api', limiter);

// CORS Configuration with dynamic origin support for Vercel & localhost
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5174',
  'https://healora-flax.vercel.app',
  ...(process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',').map((s) => s.trim()) : [])
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, same-origin)
    if (!origin) return callback(null, true);

    const isAllowed =
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') ||
      origin.includes('vercel.app') ||
      origin.includes('vercel.com');

    if (isAllowed) {
      return callback(null, true);
    }
    // Fallback: reflect request origin to prevent deployment CORS blocks
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

// Body and Cookie Parsers
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'MediSense API Server is healthy and running.'
  });
});

// API Routes Mounting
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/diseases', diseaseRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/ai-doctor', aiDoctorRoutes);
app.use('/api/admin', adminRoutes);



// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
