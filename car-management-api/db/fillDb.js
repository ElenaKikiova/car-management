const { cars, garages } = require('./initialData.js')

const fillCarsData = async (db) => {
    const carsCollection = db.collection('cars');
    try {
        await carsCollection.insertMany(cars);
        console.log("Initial car data uploaded");
    } catch (err) {
        console.error('Error inserting car data:', err);
    }
};

const fillGaragesData = async (db) => {
    const garagesCollection = db.collection('garages');
    try {
        await garagesCollection.insertMany(garages);
        console.log("Initial garage data uploaded");
    } catch (err) {
        console.error('Error inserting garage data:', err);
    }
};

module.exports = {
    fillCarsData,
    fillGaragesData
};