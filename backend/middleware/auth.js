import admin from '../config/firebase.js';
import User from '../models/User.js';

export const verifyToken = async (req, res, next) => {
  try {
    // Check if Firebase is initialized
    if (!admin.apps.length) {
      return res.status(503).json({ 
        success: false, 
        message: 'Authentication service not configured. Please configure Firebase credentials.' 
      });
    }

    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided' 
      });
    }

    const token = authHeader.split('Bearer ')[1];

    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Find or create user in database
    let user = await User.findOne({ firebaseUid: decodedToken.uid });
    
    if (!user) {
      user = await User.create({
        firebaseUid: decodedToken.uid,
        email: decodedToken.email,
        displayName: decodedToken.name || '',
        role: 'user'
      });
    } else {
      // Update last login
      user.lastLogin = new Date();
      await user.save();
    }

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      role: user.role
    };

    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid or expired token' 
    });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      message: 'Admin access required' 
    });
  }
  next();
};
