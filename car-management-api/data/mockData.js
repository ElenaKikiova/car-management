const cars = [
    { "id": "1", "make": "Toyota", "model": "Corolla", "productionYear": 2020, "licensePlate": "ABC123WC" },
    { "id": "2", "make": "Ford", "model": "Focus", "productionYear": 2018, "licensePlate": "XYZ789EE" },
    { "id": "3", "make": "Honda", "model": "Civic", "productionYear": 2021, "licensePlate": "LMN456VV" },
    { "id": "4", "make": "Chevrolet", "model": "Malibu", "productionYear": 2019, "licensePlate": "DEF123ER" },
    { "id": "5", "make": "BMW", "model": "320i", "productionYear": 2022, "licensePlate": "GHI789PO" },
    { "id": "6", "make": "Opel", "model": "Astra", "productionYear": 2016, "licensePlate": "PB5678GH" },
    { "id": "7", "make": "Audi", "model": "A4", "productionYear": 2020, "licensePlate": "MNO345FG" },
    { "id": "8", "make": "Mercedes-Benz", "model": "C-Class", "productionYear": 2017, "licensePlate": "PQR678ED" },
    { "id": "9", "make": "Nissan", "model": "Altima", "productionYear": 2021, "licensePlate": "STU901SD" },
    { "id": "10", "make": "Hyundai", "model": "Elantra", "productionYear": 2022, "licensePlate": "VWX234WE" }
]

const fillCarsData = (db) => {
    const stmt = db.prepare('INSERT INTO cars (id, make, model, productionYear, licensePlate) VALUES (?, ?, ?, ?, ?)');

    cars.forEach(car => {
        stmt.run(car.id, car.make, car.model, car.productionYear, car.licensePlate);
    });

    stmt.finalize(() => {
        console.log('Initial car data uploaded');
    });
}

module.exports = { fillCarsData };