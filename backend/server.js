// Backend server file
const express = require('express');
const app = express();

// This helps the server understand JSON data
app.use(express.json());

// Health check route - a simple test to see if the server is alive
app.get('/health', (req, res) => {
    res.json({
        status:"OK",
        message: "Backend server is running!",
    });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// neon string: postgresql://neondb_owner:npg_rBR3b6UHndML@ep-silent-king-aocqt7bz.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
// local postgres string: DATABASE_URL=postgresql://russellfang@localhost:5432/myCatalog
