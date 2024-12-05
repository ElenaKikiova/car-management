const cars = [
	{ id: 1, make: "Toyota", model: "Corolla", productionYear: 2020, licensePlate: "ABC123WC" },
	{ id: 2, make: "Ford", model: "Focus", productionYear: 2018, licensePlate: "XYZ789EE" },
	{ id: 3, make: "Honda", model: "Civic", productionYear: 2021, licensePlate: "LMN456VV" },
	{ id: 4, make: "Chevrolet", model: "Malibu", productionYear: 2019, licensePlate: "DEF123ER" },
	{ id: 5, make: "BMW", model: "320i", productionYear: 2022, licensePlate: "GHI789PO" },
	{ id: 6, make: "Opel", model: "Astra", productionYear: 2016, licensePlate: "PB5678GH" },
	{ id: 7, make: "Audi", model: "A4", productionYear: 2020, licensePlate: "MNO345FG" },
	{
		id: 8,
		make: "Mercedes-Benz",
		model: "C-Class",
		productionYear: 2017,
		licensePlate: "PQR678ED",
	},
	{ id: 9, make: "Nissan", model: "Altima", productionYear: 2021, licensePlate: "STU901SD" },
	{ id: 10, make: "Hyundai", model: "Elantra", productionYear: 2022, licensePlate: "VWX234WE" },
];

const garages = [
	{
	    id: 1,
		name: "Downtown Garage",
		location: "123 Main St",
		city: "New York",
		capacity: 150,
	},
	{
		id: 2,
		name: "Central Garage",
		location: "456 Park Ave",
		city: "New York",
		capacity: 200,
	},
	{
		id: 3,
		name: "Eastside Garage",
		location: "789 East St",
		city: "Chicago",
		capacity: 120,
	},
	{
		id: 4,
		name: "Westside Garage",
		location: "101 West Blvd",
		city: "Chicago",
		capacity: 180,
	},
	{
		id: 5,
		name: "Bay Area Garage",
		location: "202 Ocean Rd",
		city: "San Francisco",
		capacity: 250,
	},
	{
		id: 6,
		name: "Sunny Garage",
		location: "303 Sunshine Dr",
		city: "Los Angeles",
		capacity: 100,
	},
];

const garagesCars = [
    { car_id: 1, garage_id: 1 },
    { car_id: 2, garage_id: 2 },
    { car_id: 3, garage_id: 1 },
    { car_id: 4, garage_id: 3 },
    { car_id: 5, garage_id: 4 },
    { car_id: 6, garage_id: 5 },
    { car_id: 7, garage_id: 2 },
    { car_id: 8, garage_id: 6 },
    { car_id: 9, garage_id: 3 },
    { car_id: 10, garage_id: 4 }
];

module.exports = { cars, garages, garagesCars };
