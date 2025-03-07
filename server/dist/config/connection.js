import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/techquiz', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default mongoose.connection;
