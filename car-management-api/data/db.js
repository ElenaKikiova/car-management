const sqlite3 = require('sqlite3').verbose();

const { fillCarsData } = require('./mockData.js');

const db = new sqlite3.Database('./db.sqlite');

// Init db tables and fill with data if needed
const initDb = () => {
  db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS cars (id INTEGER PRIMARY KEY, make TEXT, model TEXT, productionYear INTEGER, licensePlate TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS garages (id INTEGER PRIMARY KEY, name TEXT, location TEXT, capacity INTEGER, city TEXT)');
        db.run('CREATE TABLE IF NOT EXISTS garage_car (car_id INTEGER, garage_id INTEGER, FOREIGN KEY(car_id) REFERENCES cars(id), FOREIGN KEY(garage_id) REFERENCES garages(id))');
  });

  // Fill db with cars if needed
  db.get('SELECT COUNT(*) AS count FROM cars', (err, row) => {
    if (row.count === 0) {
      fillCarsData(db);
    }
  });
};

module.exports = {
  db,
  initDb,
};
