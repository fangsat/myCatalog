// Backend server file
const express = require('express');
const cors = require("cors");

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

// This helps the server understand JSON data
app.use(express.json());

// Health check route - a simple test to see if the server is alive

app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.use('/api/products', require('./routes/products'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost: ${PORT}`);
});


// neon string: postgresql://neondb_owner:npg_rBR3b6UHndML@ep-silent-king-aocqt7bz.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
// local postgres string: DATABASE_URL=postgresql://russellfang@localhost:5432/myCatalog
