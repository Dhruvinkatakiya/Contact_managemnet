import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production-2024';

// Middleware to verify JWT token
export const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token is required'
      });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({
            success: false,
            message: 'Token has expired'
          });
        }
        return res.status(403).json({
          success: false,
          message: 'Invalid token'
        });
      }

      // Attach user info to request object
      req.user = {
        userId: decoded.userId,
        email: decoded.email
      };
      
      next();
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error authenticating token'
    });
  }
};

// Generate JWT token
export const generateToken = (userId, email) => {
  return jwt.sign(
    { userId, email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

export default { authenticateToken, generateToken };
