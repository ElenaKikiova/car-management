const express = require("express");
const router = express.Router();
const { getDb } = require("../db/db.js");

// Get all cars and their garages
router.get("/", async (req, res) => {
  try {
    const db = getDb();
    const carsWithGarages = await db.collection('cars').aggregate([
          {
            $lookup: {
              from: 'garages',
              localField: 'garageIds',
              foreignField: 'id',
              as: 'garages'
            }
          }
        ]).toArray();

        res.json(carsWithGarages);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching cars");
  }
});

module.exports = router;
