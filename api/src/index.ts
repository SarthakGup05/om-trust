import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { seedInitialAdmin } from './models/Admin.js';
import apiRouter from './routes/api.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

// Trust proxy setting (enabled for reverse proxies like Render)
app.set('trust proxy', 1);

// CORS configuration
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((url) => url.trim())
  : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000', 'https://www.omcharitabletrust.net', 'https://omcharitabletrust.net'];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.indexOf(origin) !== -1 ||
      allowedOrigins.includes('*') ||
      origin.includes('localhost') ||
      origin.includes('127.0.0.1') ||
      origin.includes('omcharitabletrust.net')
    ) {
      return callback(null, true);
    }
    return callback(null, true); // Permissive in dev
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Body parser
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Mount API routes
app.use('/api', apiRouter);

// 404 handler for undefined API routes
app.use('/api/*', (_req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found',
  });
});

// Centralized error handler
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Connect to database
    if (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('<db_password>')) {
      await connectDB();
      await seedInitialAdmin();
    } else if (process.env.MONGODB_URI && process.env.MONGODB_URI.includes('<db_password>')) {
      console.warn('[Server] WARNING: MONGODB_URI contains <db_password> placeholder. Please replace it with your MongoDB Atlas password in api/.env.');
    } else {
      console.warn('[Server] WARNING: MONGODB_URI is not set. Database not connected.');
    }

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`[Server] Om Charitable Trust API running on http://0.0.0.0:${PORT}`);
      console.log(`[Server] Health check available at http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('[Server] Fatal error during startup:', error);
    process.exit(1);
  }
};

startServer();
