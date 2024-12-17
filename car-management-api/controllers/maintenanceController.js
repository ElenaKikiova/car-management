const { getDb } = require("../db/db.js");

// Get all maintenance records
const getAllMaintenanceRecords = async (req, res) => {
   try {
        const db = getDb();

        const { carId, garageId, startDate, endDate } = req.query;

        // Build the query filter
        const query = {};

        if (carId) {
            query.carId = parseInt(carId);
        }
        if (garageId) {
            query.garageId = parseInt(garageId);
        }

        if (startDate && endDate) {
            query.date = { $gte:startDate, $lte: endDate };
        } else if (startDate) {
            query.date = { $gte: startDate };
        } else if (endDate) {
            query.date = { $lte: endDate };
        }

        // Look up maintenance records and populate car and garage data
        const request = [
            { $match: query },
            {
                $lookup: {
                    from: 'cars',
                    localField: 'carId',
                    foreignField: 'id',
                    as: 'car'
                },
            },
            {
                $lookup: {
                    from: 'garages',
                    localField: 'garageId',
                    foreignField: 'id',
                    as: 'garage'
                }
            }
        ];

        const maintenanceRecords = await db.collection('maintenance').aggregate(request).toArray();

        // Extract only car name (make + model) and garage name. Delete the car and garage objects
        const result = maintenanceRecords.map((record) => {
            record = {...record, carName: record.car[0].make + " " + record.car[0].model, garageName: record.garage[0].name}
            delete record.car;
            delete record.garage;
            return record
        })

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(400).send("Error fetching cars");
    }
};

module.exports = {
    getAllMaintenanceRecords
}