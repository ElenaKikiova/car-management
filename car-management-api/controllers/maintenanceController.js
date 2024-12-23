const { getDb } = require("../db/db.js");

// Reused function for populating carName and garageName and finding maintenance records by id
const populateMaintenanceRecordData = async (db, query) => {
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

    if(maintenanceRecords.length === 0){
        return false;
    }

    // Extract only car name (make + model) and garage name. Delete the car and garage objects
    return maintenanceRecords.map((record) => {
        const result = {
            ...record,
            carName: record.car[0].make + " " + record.car[0].model,
            garageName: record.garage[0].name
        }
        delete result.car;
        delete result.garage;
        return result;
    })
}

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

        const maintenanceRecords = await populateMaintenanceRecordData(db, query);

        if(maintenanceRecords){
            res.status(200).json(maintenanceRecords);
        }
        else {
            return res.status(404).send("Maintenance records not found");
        }
    } catch (err) {
        console.error(err);
        res.status(400).send("Error fetching cars");
    }
};

// Get maintenance record by id
const getMaintenanceRecordById = async (req, res) => {
    try {
        const db = getDb();
        const id = parseInt(req.params.id);

        const maintenanceRecord = await populateMaintenanceRecordData(db, { id });

        if(maintenanceRecord){
            res.status(200).json(maintenanceRecord[0]);
        }
        else {
            return res.status(404).send("Maintenance records not found");
        }
    } catch (err) {
        console.error(err);
        res.status(400).send("Error fetching maintenance record");
    }
};

// Create a new maintenance record
const createMaintenanceRecord = async (req, res) => {
    try {
        const db = getDb();
        const { carId, garageId, serviceType, scheduledDate } = req.body;

        if (!carId || !garageId || !serviceType || !scheduledDate) {
            return res.status(400).send("Missing required fields");
        }

        let maintenanceRecord = {
            carId: parseInt(carId),
            garageId: parseInt(garageId),
            serviceType,
            scheduledDate
        };

        // Get the last maintenance record id and increment it
        const lastMaintenance = await db.collection("maintenance").findOne({}, { sort: { id: -1 } });
        maintenanceRecord.id = lastMaintenance.id + 1;

        await db.collection('maintenance').insertOne(maintenanceRecord);
        const newRecord = await populateMaintenanceRecordData(db, { id: maintenanceRecord.id });
        res.status(201).json(newRecord[0]);
    } catch (err) {
        console.error(err);
        res.status(400).send("Error creating maintenance record");
    }
};

// Update maintenance record by id
const updateMaintenanceRecord = async (req, res) => {
    try {
        const db = getDb();
        const maintenanceRecordId = parseInt(req.params.id);
        const { carId, garageId, serviceType, scheduledDate } = req.body;

        if (!carId || !garageId || !serviceType || !scheduledDate) {
            return res.status(400).send("Missing required fields");
        }

        const updateData = {
            carId: parseInt(carId),
            garageId: parseInt(garageId),
            serviceType,
            scheduledDate
        };

        const updateResult = await db.collection('maintenance').updateOne(
            { id: maintenanceRecordId },
            { $set: updateData }
        );

        if (updateResult.matchedCount === 0) {
            return res.status(404).send("Maintenance record not found");
        }

        const updatedRecord = await populateMaintenanceRecordData(db, { id: maintenanceRecordId })

        res.status(200).json(updatedRecord[0]);
    } catch (err) {
        console.error(err);
        res.status(400).send("Error updating maintenance record");
    }
};

// Delete maintenance record by id
const deleteMaintenanceRecord = async (req, res) => {
    try {
        const db = getDb();
        const { id } = req.params;

        const result = await db.collection('maintenance').deleteOne({ id: parseInt(id) });

        if (result.deletedCount === 0) {
            return res.status(404).send("Maintenance record not found");
        }

        res.status(200).send("Maintenance record deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(400).send("Error deleting maintenance record");
    }
};

module.exports = {
    getAllMaintenanceRecords,
    getMaintenanceRecordById,
    createMaintenanceRecord,
    updateMaintenanceRecord,
    deleteMaintenanceRecord,
    deleteMaintenanceRecord
}