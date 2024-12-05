const { MongoClient } = require('mongodb');
const { fillCarsData, fillGaragesData } = require("./fillDb.js");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const dbName = "car-management-db";

let db;

async function connectToDb() {
    try {
        const client = await MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = client.db(dbName);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

const initDb = async (db) => {
    try {
        await client.connect();
        db = client.db(dbName);

        const carsCollection = db.collection('cars');
        const garagesCollection = db.collection('garages');

        // Check if collections have data
        const carCount = await carsCollection.countDocuments();
        if (carCount === 0) {
            await fillCarsData(db);
        }

        const garageCount = await garagesCollection.countDocuments();
        if (garageCount === 0) {
            await fillGaragesData(db);
        }

        console.log("Database initialized successfully");

    } catch (err) {
        console.error("Error initializing DB:", err);
    }
};

const getDb = () => db;

const deleteDb = async () => {
    const db = getDb();
    try {
        await db.dropDatabase();
        console.log(`Database has been deleted successfully.`);
    } catch (error) {
        console.error("Error deleting database:", error);
    }
}

module.exports = { db, connectToDb, initDb, getDb, deleteDb };