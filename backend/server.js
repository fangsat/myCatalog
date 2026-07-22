require('dotenv').config();

const Sentry =require('@sentry/node');

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    sendDefaultPii: false,
});

// Backend server file
const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');

// ======================
// 1. CREATE THE APP
// ======================
const app = express();

// ======================
// 2. CONFIGURE CORS ORIGIN
// ======================
// In production (Render), FRONTEND_ORIGIN is set to the real Vercel URL.
// Locally, that env var doesn't exist, so this falls back to localhost.
const ALLOWED_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';

// ======================
// 3. ADD MIDDLEWARE
// ======================
// Middleware runs before routes and helps process requests
app.use(cors({
    origin: ALLOWED_ORIGIN,
    credentials: true // allows the browser to send/receive the httpOnly auth cookie
}));

app.use(cookieParser());

// This helps the server understand JSON data sent from frontend
app.use(express.json());

// ======================
// 4. ROUTES / ENDPOINTS
// ======================
// Health check route - a simple test to see if the server is alive
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Auth routes (register & login)
const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

// Products routes
app.use('/api/products', require('./routes/products'));

// Me routes
app.use('/api/me', require('./routes/me'));

Sentry.setupExpressErrorHandler(app);

// ======================
// 5. START THE SERVER
// ======================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});


// neon string: postgresql://neondb_owner:npg_rBR3b6UHndML@ep-silent-king-aocqt7bz.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
// local postgres string: DATABASE_URL=postgresql://russellfang@localhost:5432/myCatalog


// new neon string: postgresql://neondb_owner:npg_swneSQE9kO5K@ep-sparkling-boat-azngby6y.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require