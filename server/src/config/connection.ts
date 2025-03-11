import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

// Simple debug logging to see what's happening
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techquiz';
console.log(`CONNECTION STRING (masked): ${connectionString?.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@') || 'undefined'}`);
console.log(`ENV VARIABLES: ${Object.keys(process.env).join(', ')}`);

mongoose.connect(connectionString)
  .then(() => console.log('✅ Connected to MongoDB!'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

export default mongoose.connection;
