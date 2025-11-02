import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }
    
    // Connect to MongoDB Atlas
    // Note: Special characters in password must be URL encoded
    // @ = %40, < = %3C, > = %3E, # = %23, % = %25, etc.
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Modern Mongoose options (deprecated options like useNewUrlParser and useUnifiedTopology removed)
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });

    console.log(`✅ Connected to MongoDB Atlas: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB Atlas: ${error.message}`);
    console.error('\n💡 Troubleshooting tips:');
    console.error('   1. Check your MongoDB Atlas connection string format');
    console.error('   2. Ensure your IP is whitelisted in MongoDB Atlas (or use 0.0.0.0/0 for all IPs)');
    console.error('   3. Verify your username and password are correct');
    console.error('   4. Special characters in password MUST be URL encoded:');
    console.error('      - @ becomes %40');
    console.error('      - < becomes %3C');
    console.error('      - > becomes %3E');
    console.error('      - # becomes %23');
    console.error('      - % becomes %25');
    console.error('\n📝 Connection string format:');
    console.error('   mongodb+srv://username:ENCODED_PASSWORD@cluster.mongodb.net/database?options');
    console.error('\n   Example:');
    console.error('   If password is "Rishu@54321", use "Rishu%4054321"');
    process.exit(1);
  }
};

export default connectDB;
