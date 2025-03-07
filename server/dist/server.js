import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './config/connection.js';
import routes from './routes/index.js';
const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const HOST = '0.0.0.0'; // Bind to all available IP addresses
// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve static files from the client's dist folder
app.use(express.static(path.join(__dirname, '../../client/dist')));
// Use routes
app.use(routes);
// Serve the frontend's index.html for all other routes (for SPA compatibility)
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});
// Start the server after the database connection is established
db.once('open', () => {
    app.listen(PORT, HOST, () => {
        console.log(`🌍 Now listening on http://${HOST}:${PORT}`);
    });
});
