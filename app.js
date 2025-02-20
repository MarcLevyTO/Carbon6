const loader = require('./defaults/loader');

// Import required modules
const express = require('express');
const routes = require('./routes');
const db = require('./db');

// Setup Express app
const app = express();
app.use(express.json());
app.use('/', routes);

// Initialize data from JSON file to database
loader();

// Setup Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;