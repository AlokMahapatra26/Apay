const express = require('express');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoutes');
const accountRoutes = require('./routes/accountRoutes');
require('dotenv').config();
const cors  = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
connectDB();
app.use(express.json());
app.use(cors());

// Define routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/account', accountRoutes);

app.get("/" , (req,res)=>{
    res.json({message:"Server is up and running"});
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});