const cars = [
	{ id: 1, make: "Toyota", model: "Corolla", productionYear: 2020, licensePlate: "ABC123WC", garageIds: [1] },
	{ id: 2, make: "Ford", model: "Focus", productionYear: 2018, licensePlate: "XYZ789EE", garageIds: [1, 5] },
	{ id: 3, make: "Honda", model: "Civic", productionYear: 2021, licensePlate: "LMN456VV", garageIds: [2] },
	{ id: 4, make: "Chevrolet", model: "Malibu", productionYear: 2019, licensePlate: "DEF123ER", garageIds: [2, 4] },
	{ id: 5, make: "BMW", model: "320i", productionYear: 2022, licensePlate: "GHI789PO", garageIds: [3, 4] },
	{ id: 6, make: "Opel", model: "Astra", productionYear: 2016, licensePlate: "PB5678GH", garageIds: [5] },
	{ id: 7, make: "Audi", model: "A4", productionYear: 2020, licensePlate: "MNO345FG", garageIds: [6, 7, 8] },
	{
		id: 8,
		make: "Mercedes-Benz",
		model: "C-Class",
		productionYear: 2017,
		licensePlate: "PQR678ED",
		garageIds: [9]
	},
	{ id: 9, make: "Nissan", model: "Altima", productionYear: 2021, licensePlate: "STU901SD", garageIds: [9, 10] },
	{ id: 10, make: "Hyundai", model: "Elantra", productionYear: 2022, licensePlate: "VWX234WE", garageIds: [2, 10] },
];

const garages =
	[
      {
        "_id": "6751d79d37646c88e6c37b07",
        "id": 1,
        "name": "Downtown Garage",
        "location": "123 Main St",
        "city": "New York",
        "capacity": 150
      },
      {
        "_id": "6751d79d37646c88e6c37b08",
        "id": 2,
        "name": "Central Garage",
        "location": "456 Park Ave",
        "city": "New York",
        "capacity": 200
      },
      {
        "_id": "6751d79d37646c88e6c37b09",
        "id": 3,
        "name": "Eastside Garage",
        "location": "789 East St",
        "city": "Chicago",
        "capacity": 120
      },
      {
        "_id": "6751d79d37646c88e6c37b0a",
        "id": 4,
        "name": "Westside Garage",
        "location": "101 West Blvd",
        "city": "Chicago",
        "capacity": 180
      },
      {
        "_id": "6751d79d37646c88e6c37b0b",
        "name": "Bay Area Garage",
        "location": "202 Ocean Rd",
        "city": "San Francisco",
        "capacity": 250
      },
      {
        "_id": "6751d79d37646c88e6c37b0c",
        "id": 6,
        "name": "Sunny Garage",
        "location": "303 Sunshine Dr",
        "city": "Los Angeles",
        "capacity": 100
      }
    ];


module.exports = { cars, garages };
