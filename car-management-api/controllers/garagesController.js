const express = require("express");
const router = express.Router();
const { db } = require("../data/db.js");

// Get all garages
router.get("/", (req, res) => {
	db.all("SELECT * FROM garages", (err, rows) => {
		if (err) return res.status(500).send(err.message);
		res.json(rows);
	});
});

module.exports = router;
