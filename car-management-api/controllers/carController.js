const express = require("express");
const router = express.Router();
const { db } = require("../data/db.js");

// Get all cars
router.get("/", (req, res) => {
	const query = `
        SELECT cars.*, garages.*
        FROM cars
        JOIN garage_car ON cars.id = garage_car.car_id
        JOIN garages ON garage_car.garage_id = garages.id;
    `;

	db.all(query, (err, rows) => {
		if (err) return res.status(500).send(err.message);
		res.json(rows);
	});
});

module.exports = router;
