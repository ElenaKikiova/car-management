const { cars, garages, garagesCars } = require("./initialData.js");

const fillCarsData = (db) => {
	const insertReq = db.prepare(
		"INSERT INTO cars (id, make, model, productionYear, licensePlate) VALUES (?, ?, ?, ?, ?)"
	);

	cars.forEach((car) => {
		insertReq.run(car.id, car.make, car.model, car.productionYear, car.licensePlate, (err) => {
           if (err) {
               console.error('Error inserting data into garage_car:', err);
           }
        });
	});

	insertReq.finalize(() => {
		console.log("Initial car data uploaded");
	});
};

const fillGaragesData = (db) => {
	const insertReq = db.prepare(
		"INSERT INTO garages (name, location, city, capacity) VALUES (?, ?, ?, ?)"
	);

	garages.forEach((garage) => {
		insertReq.run(garage.name, garage.location, garage.city, garage.capacity, (err) => {
            if (err) {
                console.error('Error inserting data into garage_car:', err);
            }
        });
	});

	insertReq.finalize(() => {
		console.log("Initial garage data uploaded");
	});
};


const fillGaragesCarsData = (db) => {
	const insertReq = db.prepare(
		'INSERT INTO garage_car (car_id, garage_id) VALUES (?, ?)'
	);

	garagesCars.forEach((garagesCars) => {
		insertReq.run(garagesCars.car_id, garagesCars.garage_id, (err) => {
            if (err) {
                console.error('Error inserting data into garage_car:', err);
            }
		});
	});

	insertReq.finalize(() => {
		console.log("Initial garage data uploaded");
	});
};

module.exports = { fillCarsData, fillGaragesData, fillGaragesCarsData };
