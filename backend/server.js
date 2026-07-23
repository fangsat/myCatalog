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

// Sentry's error handler must be registered BEFORE our own errorHandler below.
// It works like a security camera, not a receptionist: it silently captures
// and reports the error to the Sentry dashboard, then automatically calls
// next(err) internally to pass the same error further down the chain.
// It never sends an HTTP response itself - that's still our job below.
// If this were placed AFTER errorHandler instead, errorHandler would already
// have sent a response and ended the chain, so Sentry would never see the error at all.
Sentry.setupExpressErrorHandler(app);

// ======================
// 5. CENTRALIZED ERROR HANDLER
// ======================
// Must be defined with exactly 4 parameters (err, req, res, next) so Express
// recognizes it as error-handling middleware, not a normal route/middleware.
// Must be registered AFTER every route and after Sentry.setupExpressErrorHandler,
// since Express only routes errors to handlers registered after the point of failure.

//Error Station
function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(err.status || 500).json({error:  err.message || 'Something went wrong' });
}

app.use(errorHandler);

// ======================
// 6. START THE SERVER
// ======================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});

