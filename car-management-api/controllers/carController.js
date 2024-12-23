const { getDb } = require("../db/db.js");

// Get all cars and their garages
const getAllCars = async (req, res) => {
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

        // Look up cars by make/year/etc and populate garages
        const request = [
            { $match: query },
            {
                $lookup: {
                    from: 'garages',
                    localField: 'garageIds',
                    foreignField: 'id',
                    as: 'garages'
                }
            }
        ];

        if (garageId) {
            request.push({
                $match: {
                    'garages.id': parseInt(garageId)
                }
            });
        }

        const carsWithGarages = await db.collection('cars').aggregate(request).toArray();

        res.status(200).json(carsWithGarages);
    } catch (err) {
        console.error(err);
        res.status(400).send("Error fetching cars");
    }
};

// Get a car by id (not _id)
const getCarById = async (req, res) => {
    try {
        const db = getDb();
        const carId = parseInt(req.params.id);

        if (isNaN(carId)) {
            return res.status(400).send("Invalid or missing car id");
        }

        // Look up car by id and populate garages
        const carWithGarage = await db.collection('cars').aggregate([
            { $match: { id: carId } },
            {
                $lookup: {
                    from: 'garages',
                    localField: 'garageIds',
                    foreignField: 'id',
                    as: 'garages'
                }
            }
        ]).toArray();

        if (carWithGarage.length === 0) {
            return res.status(404).send("Car not found");
        }

        res.json(carWithGarage[0]);
    } catch (err) {
        console.error(err);
        res.status(400).send("Error fetching car");
    }
};

// Create a new car
const createCar = async (req, res) => {
    try {
        const db = getDb();
        const newCar = req.body;

        // Validate car fields
        const { make, model, productionYear, garageIds } = newCar;
        if (!make || !model || !productionYear || !Array.isArray(garageIds)) {
            return res.status(400).send("Missing required car fields");
        }

        // Get last car's id and increment it
        const lastEntry = await db.collection("cars").findOne({}, { sort: { _id: -1 } });
        newCar.id = lastEntry.id ? lastEntry.id + 1 : 1;

        // Parse garage ids to integers
        newCar.garageIds = garageIds.map((garageId) => parseInt(garageId));

        const result = await db.collection('cars').insertOne(newCar);

        if(result){
            const garages = await db.collection('garages').find({
                id: { $in: newCar.garageIds }
            }).toArray();

            // Return the new car with its garages
            return res.status(200).send({ ...newCar, garages});
        } else {
            res.status(400).send("Error creating car");
        }
    } catch (err) {
        console.error(err);
        res.status(400).send("Error creating car");
    }
};

// Update car
const updateCar = async (req, res) => {
    try {
        const db = getDb();
        const carId = parseInt(req.params.id);

        if (!carId) {
            return res.status(400).send("Missing car id");
        }

        let updateData = req.body;

        // Delete populated garages
        delete updateData.garages;

        // Parse the garage id's to integers
        updateData = { ...updateData, garageIds: updateData.garageIds.map((garageId) => parseInt(garageId)) };

        const result = await db.collection("cars").updateOne(
            { id: carId },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).send("Car not found");
        }

        res.status(200).send({ carId, ...updateData });
    } catch (err) {
        console.error(err);
        res.status(400).send("Error updating car");
    }
};

// Delete car
const deleteCar = async (req, res) => {
    try {
        const db = getDb();
        const carId = parseInt(req.params.id);

        if (!carId) {
            return res.status(400).send("Missing car id");
        }

        const result = await db.collection('cars').deleteOne({ id: carId });

        if (result.deletedCount === 0) {
            return res.status(404).send("Car not found");
        }

        res.status(200).send("Car deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(400).send("Error deleting car");
    }
};

module.exports = {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
};
