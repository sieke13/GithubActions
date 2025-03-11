import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

// Use a database name in your connection string
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techquiz';

// Add database name if not present
const connectionWithDB = connectionString.endsWith('/') 
  ? `${connectionString}techquiz` 
  : connectionString;

console.log(`Connecting to MongoDB: ${connectionWithDB.replace(/\/\/([^:]+):([^@]+)@/, '//\\1:****@')}`);

mongoose.connect(connectionWithDB)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    console.error('This might cause API failures. Please check your connection string.');
  });

export default mongoose.connection;
