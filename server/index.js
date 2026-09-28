import express from 'express';
import cors from 'cors';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import apiRouter from './routes/api.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// API_PORT wins in development (Vite proxies to it); hosts usually set PORT.
const PORT = Number(process.env.API_PORT || process.env.PORT) || 5000;
const CLIENT_DIST = path.resolve(__dirname, '../client/dist');

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') ?? true }));
app.use(express.json({ limit: '50kb' }));

app.use((req, res, next) => {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'SAMEORIGIN',
  });
  next();
});

app.use('/api', apiRouter);

// In production, serve the built React app and let the client router handle
// every non-API path.
if (existsSync(CLIENT_DIST)) {
  app.use(express.static(CLIENT_DIST, { maxAge: '7d', index: false }));
  app.get(/^\/(?!api\/).*/, (req, res) => res.sendFile(path.join(CLIENT_DIST, 'index.html')));
}

app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'Requête invalide.' });
  console.error(err);
  res.status(500).json({ error: 'Une erreur est survenue. Merci de réessayer.' });
});

app.listen(PORT, () => {
  console.log(`Le Bistro Latin API → http://localhost:${PORT}`);
});
