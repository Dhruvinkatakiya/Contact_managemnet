import express from 'express';
import cors from 'cors';
import authRoutes from '../backend/routes/auth.js';
import contactRoutes from '../backend/routes/contacts.js';

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes - remove /api prefix since Vercel already routes to /api
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Contact Management API is running',
    timestamp: new Date().toISOString()
  });
});

// Root API endpoint
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Contact Management API',
    endpoints: ['/api/auth', '/api/contacts']
  });
});

// Catch all for /api routes
app.all('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// Export handler for Vercel
export default app;
