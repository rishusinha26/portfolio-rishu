import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Set user as admin
const setAdmin = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Get Firebase UID or email from command line arguments
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
      console.log('\n📝 Usage: node scripts/setAdmin.js <firebase_uid_or_email>');
      console.log('\n   Example: node scripts/setAdmin.js user@example.com');
      console.log('   Example: node scripts/setAdmin.js abc123xyz456\n');
      process.exit(1);
    }

    const identifier = args[0];
    
    // Try to find user by email or firebaseUid
    let user = await User.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { firebaseUid: identifier }
      ]
    });

    if (!user) {
      console.log(`\n❌ User not found: ${identifier}`);
      console.log('\n💡 Tip: Login to your app first, then run this script with your email or Firebase UID.\n');
      process.exit(1);
    }

    // Update user role to admin
    user.role = 'admin';
    await user.save();

    console.log(`\n✅ User "${user.email}" (${user.firebaseUid}) has been set as admin!`);
    console.log('\n🎉 You can now access the admin dashboard!\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('👋 Database connection closed');
    process.exit(0);
  }
};

// Run the script
setAdmin();

