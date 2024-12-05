const express = require("express");
const router = express.Router();
const { getDb } = require("../db/db.js");

// Get all cars and their garages
router.get("/", async (req, res) => {
    try {
        const db = getDb();

        const { carMake, garageId, fromYear, toYear } = req.query;

        // Build the query filter
        const query = {};

        if (carMake) {
            query.make = { $regex: carMake, $options: 'i' };
        }

        if (fromYear && toYear) {
            query.productionYear = { $gte: parseInt(fromYear), $lte: parseInt(toYear) };
        } else if (fromYear) {
            query.productionYear = { $gte: parseInt(fromYear) };
        } else if (toYear) {
            query.productionYear = { $lte: parseInt(toYear) };
        }

        const request = [
            {
                $match: query
            },
            {
                $lookup: {
                    from: 'garages',
                    localField: 'garageIds',
                    foreignField: 'id',
                    as: 'garages'
                }
            }
        ]

        if(garageId){
            request.push(
                {
                    $match: {
                        'garages.id': parseInt(garageId)
                    }
                })
        }

        const carsWithGarages = await db.collection('cars').aggregate(request).toArray();


        res.json(carsWithGarages);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching cars");
    }
});

module.exports = router;
