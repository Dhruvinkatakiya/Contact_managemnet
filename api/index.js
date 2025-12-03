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
app.use('/auth', authRoutes);
app.use('/contacts', contactRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Contact Management API is running',
    timestamp: new Date().toISOString()
  });
});

// Root API endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Contact Management API',
    endpoints: ['/auth', '/contacts']
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

// Export for Vercel serverless function
export default app;
