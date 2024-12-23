const { getDb } = require("../db/db.js");

// Get all garages
const getAllGarages = async (req, res) => {
    try {
        const db = getDb();

        const { city } = req.query;

        // Build query with city param
        const query = {};
        if (city) {
            query.city = { $regex: city, $options: "i" };
        }

        const garages = await db.collection("garages").find(query).toArray();

        res.status(200).json(garages);
    } catch (err) {
        console.error(err);
        res.status(400).send("Error fetching garages");
    }
};

// Get a garage by id (not _id)
const getGarageById = async (req, res) => {
    try {
        const db = getDb();
        const garageId = parseInt(req.params.id);

        if (isNaN(garageId)) {
            return res.status(400).send("Missing garage id");
        }

        // Fetch garage by id
        const garage = await db.collection("garages").findOne({ id: garageId });

        if (!garage) {
            return res.status(404).send("Garage not found");
        }

        res.status(200).json(garage);
    } catch (err) {
        console.error(err);
        res.status(400).send("Error fetching garage");
    }
};

// Create a new garage
const createGarage = async (req, res) => {
    try {
        const db = getDb();
        const newGarage = req.body;

        // Validate required garage fields
        const { name, location, capacity, city } = newGarage;
        if (!name || !location || !capacity || !city) {
            return res.status(400).send("Missing required garage fields");
        }

        // Get the last garage id and increment it
        const lastGarage = await db.collection("garages").findOne({}, { sort: { id: -1 } });
        newGarage.id = lastGarage.id + 1;

        const result = await db.collection("garages").insertOne(newGarage);
        console.error(result);

        if (result) {
            res.status(200).json(newGarage);
        } else {
            res.status(400).send("Error creating garage");
        }
    } catch (err) {
        console.error(err);
        res.status(400).send("Error creating garage");
    }
};

// Update a garage
const updateGarage = async (req, res) => {
    try {
        const db = getDb();
        const garageId = parseInt(req.params.id);

        if (isNaN(garageId)) {
            return res.status(400).send("Invalid or missing garage id");
        }

        const updateData = req.body;

        const result = await db.collection("garages").updateOne(
            { id: garageId },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).send("Garage not found");
        }

        const updatedGarage = await db.collection("garages").findOne({ id: garageId });

        res.status(200).json(updatedGarage);
    } catch (err) {
        console.error(err);
        res.status(400).send("Error updating garage");
    }
};

// Delete a garage
const deleteGarage = async (req, res) => {
    try {
        const db = getDb();
        const garageId = parseInt(req.params.id);

        if (isNaN(garageId)) {
            return res.status(400).send("Missing garage id");
        }

        const result = await db.collection("garages").deleteOne({ id: garageId });

        if (result.deletedCount === 0) {
            return res.status(404).send("Garage not found");
        }

        res.status(200).json("Garage deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(400).send("Error deleting garage");
    }
};

// Generate report for a specific garage for startDate-endDate period
const generateGarageReport = async (req, res) => {
    try {
        const db = getDb();

        const { garageId, startDate, endDate } = req.query;

        // Validate input
        if (!garageId) {
            return res.status(400).send("Missing garage id");
        }

        if (startDate > endDate) {
            return res.status(400).send("Start date shoudl be before end date");
        }

        const parsedStartDate = new Date(startDate);
        const parsedEndDate = new Date(endDate);
        if (isNaN(parsedStartDate) || isNaN(parsedEndDate)) {
            return res.status(400).send("Invalid date format");
        }

        // Get garage by id
        const garage = await db.collection("garages").findOne({ id: parseInt(garageId) });
        if (!garage) {
            return res.status(404).send("There is no garage with this id");
        }

        // Get garage maintenance records between the set dates
        const maintenances = await db.collection("maintenance").aggregate([
            {
                $match: {
                    garageId: parseInt(garageId),
                    scheduledDate: {
                        $gte: startDate,
                        $lte: endDate,
                    },
                },
            },
            {
                $group: {
                    _id: "$scheduledDate",
                    requests: { $sum: 1 },
                },
            },
        ]).toArray();

        // Combine report data
        const report = [];
        const currentDate = new Date(parsedStartDate);
        while (currentDate <= parsedEndDate) {
            const dateString = currentDate.toISOString().split("T")[0];
            const dayData = maintenances.find((m) => m._id === dateString);
            const requestsForThatDay = dayData ? dayData.requests : 0;
            const availableCapacity = garage.capacity - requestsForThatDay;

            report.push({
                date: dateString,
                requests: requestsForThatDay,
                availableCapacity: availableCapacity
            });

            currentDate.setDate(currentDate.getDate() + 1);
        }

        res.status(200).json(report);
    } catch (err) {
        console.error(err);
        res.status(400).send("Error generating report");
    }
};

module.exports = {
    getAllGarages,
    getGarageById,
    createGarage,
    updateGarage,
    deleteGarage,
    generateGarageReport
};