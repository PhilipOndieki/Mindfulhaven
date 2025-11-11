// Import required modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Import database connection
const connectDB = require('./config/database');

// Import routes
const postRoutes = require('./routes/posts');
const categoryRoutes = require('./routes/categories');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const commentRoutes = require('./routes/comments');
const ebookRoutes = require('./routes/ebooks');
const purchaseRoutes = require('./routes/purchases');
const subscriptionRoutes = require('./routes/subscriptions');
const bookmarkRoutes = require('./routes/bookmarks');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'https://mindfulhaven22.netlify.app',
    'https://mindfulhaven22.onrender.com', 
    'https://mern-stack-integration-philipondieki.onrender.com',
    'http://localhost:5173', 
    'http://localhost:3000'
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Log requests in development mode
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

// API Routes
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api', commentRoutes);
app.use('/api/ebooks', ebookRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'MERN Blog API is running',
    version: '1.0.0',
    endpoints: {
      posts: '/api/posts',
      categories: '/api/categories',
      auth: '/api/auth',
      users: '/api/users',
      comments: '/api/posts/:postId/comments',
      ebooks: '/api/ebooks',
      purchases: '/api/purchases',
      subscriptions: '/api/subscriptions',
      bookmarks: '/api/bookmarks'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

module.exports = app;