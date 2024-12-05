const express = require("express");
const router = express.Router();
const { getDb } = require("../db/db.js");

// Get all garages
router.get("/", async (req, res) => {
    try {
        const db = getDb();
        const garages = await db.collection('garages').find({}).toArray();
        res.json(garages);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching garages");
    }
});

module.exports = router;
