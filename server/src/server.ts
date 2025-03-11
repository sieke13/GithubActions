import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './config/connection.js';
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const HOST = '0.0.0.0'; // Uncomment this line - important for Render

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Debug logging
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`PORT: ${PORT}`);
console.log(`MONGODB_URI exists: ${!!process.env.MONGODB_URI}`);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../../client/dist')));

app.use(routes);

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

// Start server FIRST
app.listen(PORT, HOST, () => {
  console.log(`🌍 Server running on http://${HOST}:${PORT}`);
});

// THEN handle database connection
db.once('open', () => {
  console.log('✅ MongoDB connection established successfully');
});

db.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
  // Server continues running even if database connection fails
});