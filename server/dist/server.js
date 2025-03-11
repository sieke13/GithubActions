import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './config/connection.js';
import routes from './routes/index.js';
const app = express();
const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../client/dist')));
app.use(routes);
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});
db.once('open', () => {
    app.listen(PORT, HOST, () => {
        console.log(`🌍 Server running on http://${HOST}:${PORT}`);
    });
});
