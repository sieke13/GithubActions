import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/techquiz';

console.log(`MongoDB: Connecting to ${connectionString.replace(/\/\/([^:]+):[^@]+@/, '//***:***@')}`);

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

export default mongoose.connection;
