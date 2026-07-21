// Backend server file
const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');

// ======================
// 1. CREATE THE APP
// ======================
const app = express();



// ======================
// 2. ADD MIDDLEWARE
// ======================
// Middleware runs before routes and helps process requests
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


app.use(cookieParser());

// This helps the server understand JSON data sent from frontend
app.use(express.json());



// ======================
// 3. ROUTES / ENDPOINTS
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

// ======================
// 4. START THE SERVER
// ======================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});


// neon string: postgresql://neondb_owner:npg_rBR3b6UHndML@ep-silent-king-aocqt7bz.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
// local postgres string: DATABASE_URL=postgresql://russellfang@localhost:5432/myCatalog
