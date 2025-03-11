import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './config/connection.js';
import routes from './routes/index.js';

const app = express();
const PORT = parseInt(process.env.PORT || '3001', 10);
const HOST = '0.0.0.0';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enhanced logging for debugging
console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`PORT: ${PORT}`);
console.log(`MONGODB_URI: ${process.env.MONGODB_URI ? 'Set (value hidden)' : 'Not set'}`);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../../client/dist')));
app.use(routes);

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

// Start the server FIRST, regardless of database connection
const server = app.listen(PORT, HOST, () => {
  console.log(`🌍 Server running on http://${HOST}:${PORT}`);
});

// Connect to the database AFTER server is started
db.once('open', () => {
  console.log('✅ MongoDB connection opened successfully');
});

db.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
  // Server keeps running even with DB errors
});