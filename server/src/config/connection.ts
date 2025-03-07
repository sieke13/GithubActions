import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techquiz';
// Print URI with hidden password for debugging
console.log('Connecting to MongoDB at:', uri.replace(/:([^:@]+)@/, ':****@'));

mongoose
  .connect(uri)
  .then(() => console.log('MongoDB connection established successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

export default mongoose.connection;
