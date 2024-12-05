const express = require('express');
const router = express.Router(); // Use a Router instead of app
const {db} = require('../data/db.js'); // Database connection

// Get all cars
router.get('/', (req, res) => {
  db.all('SELECT * FROM cars', (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

module.exports = router;
