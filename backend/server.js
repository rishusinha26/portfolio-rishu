import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import connectDB from './config/database.js';

// Import routes
import projectRoutes from './routes/projectRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    // Production and development allowed origins
    const allowedOrigins = [
      // Production frontend (Render) - CURRENT URL
      'https://portfolio-rishu-2-frontend.onrender.com',
      // Old production frontends (for backward compatibility)
      'https://portfolio-rishu-2.onrender.com',
      'https://frontend-portfolio-0aec.onrender.com',
      // Environment variable for frontend URL
      process.env.FRONTEND_URL,
      // Development localhost ports
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:3000',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5174',
      'http://127.0.0.1:3000'
    ].filter(Boolean); // Remove undefined values
    
    // Allow if origin is in allowed list or matches localhost pattern in development
    if (process.env.NODE_ENV === 'development') {
      // Allow any localhost origin in development
      if (origin.match(/^http:\/\/localhost:\d+$/) || origin.match(/^http:\/\/127\.0\.0\.1:\d+$/)) {
        return callback(null, true);
      }
    }
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Contact form specific rate limit
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 contact submissions per hour
  message: 'Too many contact form submissions, please try again later.'
});
app.use('/api/contact', contactLimiter);

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', messageRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/upload', uploadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Portfolio API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: 'Portfolio Backend API',
    version: '1.0.0',
    endpoints: {
      projects: '/api/projects',
      contact: '/api/contact',
      experiences: '/api/experiences',
      upload: '/api/upload',
      health: '/api/health'
    }
  });
});

// 404 handler
app.use((req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ 
    success: false, 
    message: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Handle port already in use error
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use.`);
    console.error(`   Please either:`);
    console.error(`   1. Stop the process using port ${PORT}`);
    console.error(`   2. Set a different PORT in your .env file`);
    console.error(`   3. Use: netstat -ano | findstr :${PORT} (to find the process)`);
    process.exit(1);
  } else {
    throw error;
  }
});

export default app;
