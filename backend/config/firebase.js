import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Only initialize Firebase if credentials are provided
if (!admin.apps.length) {
  const hasFirebaseConfig = process.env.FIREBASE_PROJECT_ID && 
                           process.env.FIREBASE_PRIVATE_KEY && 
                           process.env.FIREBASE_CLIENT_EMAIL;
  
  if (hasFirebaseConfig) {
const serviceAccount = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
};

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
    // Storage bucket removed - using external image hosting instead
  });
    console.log('✅ Firebase Admin initialized');
  } else {
    console.warn('⚠️  Firebase credentials not found. Firebase features will be disabled.');
  }
}

export default admin;
