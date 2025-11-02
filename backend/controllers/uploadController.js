import admin from '../config/firebase.js';

// Firebase Storage bucket - disabled for now
// Uncomment and configure when Firebase is set up
// const bucket = admin.storage().bucket('your-bucket-name');
let bucket = null;

// Upload file to Firebase Storage
export const uploadFile = async (req, res) => {
  try {
    // Check if Firebase Storage is configured
    if (!bucket) {
      return res.status(501).json({ 
        success: false, 
        message: 'Firebase Storage is not configured. Please set up Firebase credentials in .env file.' 
      });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const file = req.file;
    const fileName = `${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (error) => {
      res.status(500).json({ success: false, message: error.message });
    });

    blobStream.on('finish', async () => {
      // Make the file public
      await fileUpload.makePublic();
      
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      
      res.json({ 
        success: true, 
        url: publicUrl,
        fileName: fileName
      });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete file from Firebase Storage
export const deleteFile = async (req, res) => {
  try {
    // Check if Firebase Storage is configured
    if (!bucket) {
      return res.status(501).json({ 
        success: false, 
        message: 'Firebase Storage is not configured. Please set up Firebase credentials in .env file.' 
      });
    }

    const { fileName } = req.body;
    
    if (!fileName) {
      return res.status(400).json({ success: false, message: 'File name required' });
    }

    await bucket.file(fileName).delete();
    
    res.json({ success: true, message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
