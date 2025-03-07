import express from 'express';
import path from 'path';
import db from './config/connection.js';
import routes from './routes/index.js';
const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const HOST = '0.0.0.0'; // Bind to all available IP addresses
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve static files from the client's dist folder
app.use(express.static(path.join(__dirname, '../client/dist')));
// Use routes
app.use(routes);
// Serve the frontend's index.html for all other routes (for SPA compatibility)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
// Start the server after the database connection is established
db.once('open', () => {
    app.listen(PORT, HOST, () => {
        console.log(`🌍 Now listening on http://${HOST}:${PORT}`);
    });
});
