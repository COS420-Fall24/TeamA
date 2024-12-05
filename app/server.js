const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const apiRoutes = require('./routes/api');
const path = require('path');
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'client')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Use API routes
app.use('/api', apiRoutes);

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
