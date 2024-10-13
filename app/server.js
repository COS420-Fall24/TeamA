const express = require('express');
const siteRoutes = require('./routes/site');
const apiRoutes = require('./routes/api');
const path = require('path');
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'client')));

// Use site routes
app.use('/', siteRoutes);

// Use API routes
app.use('/api', apiRoutes);

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
