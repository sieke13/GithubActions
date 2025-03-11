import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techquiz';
// Log the connection string (masking password)
console.log(`Connecting to MongoDB: ${connectionString.replace(/\/\/([^:]+):([^@]+)@/, '//\\1:****@')}`);

mongoose.connect(connectionString)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

export default mongoose.connection;
