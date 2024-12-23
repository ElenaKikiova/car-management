const cars = [
    { id: 1, make: "Toyota", model: "Corolla", productionYear: 2020, licensePlate: "ABC123WC", garageIds: [1] },
    { id: 2, make: "Ford", model: "Focus", productionYear: 2018, licensePlate: "XYZ789EE", garageIds: [1, 5] },
    { id: 3, make: "Honda", model: "Civic", productionYear: 2021, licensePlate: "LMN456VV", garageIds: [] },
    { id: 4, make: "Chevrolet", model: "Malibu", productionYear: 2019, licensePlate: "DEF123ER", garageIds: [2, 4] },
    { id: 5, make: "BMW", model: "320i", productionYear: 2022, licensePlate: "GHI789PO", garageIds: [3, 4] },
    { id: 6, make: "Opel", model: "Astra", productionYear: 2016, licensePlate: "PB5678GH", garageIds: [5] },
    { id: 7, make: "Audi", model: "A4", productionYear: 2020, licensePlate: "MNO345FG", garageIds: [2, 4] },
    {
        id: 8,
        make: "Mercedes-Benz",
        model: "C-Class",
        productionYear: 2017,
        licensePlate: "PQR678ED",
        garageIds: []
    },
    { id: 9, make: "Nissan", model: "Altima", productionYear: 2021, licensePlate: "STU901SD", garageIds: [3, 4] },
    { id: 10, make: "Hyundai", model: "Elantra", productionYear: 2022, licensePlate: "VWX234WE", garageIds: [2, 6] },
    { id: 11, make: "Ford", model: "Fiesta", productionYear: 2015, licensePlate: "ME7894EE", garageIds: [5] },
    { id: 12, make: "Nissan", model: "Leaf", productionYear: 2023, licensePlate: "ST8901SD", garageIds: [1, 2, 3] },
    { id: 14, make: "Audi", model: "TT", productionYear: 2011, licensePlate: "WE8901SD", garageIds: [3] },
    { id: 15, make: "Honda", model: "Jazz", productionYear: 2015, licensePlate: "WQ2901SD", garageIds: [5, 6] },
    { id: 16, make: "Opel", model: "Mokka", productionYear: 2024, licensePlate: "BD5678GH", garageIds: [4, 6] },
    { id: 17, make: "Toyota", model: "RAV4", productionYear: 2014, licensePlate: "QD5678GH", garageIds: [1] },
];

const garages =
	[
	  {
	    "id": 1,
	    "name": "Downtown Garage",
	    "location": "123 Main St",
	    "city": "New York",
	    "capacity": 150
	  },
	  {
	    "id": 2,
	    "name": "Central Garage",
	    "location": "456 Park Ave",
	    "city": "New York",
	    "capacity": 200
	  },
	  {
	    "id": 3,
	    "name": "Eastside Garage",
	    "location": "789 East St",
	    "city": "Chicago",
	    "capacity": 120
	  },
	  {
	    "id": 4,
	    "name": "Westside Garage",
	    "location": "101 West Blvd",
	    "city": "Chicago",
	    "capacity": 180
	  },
	  {
	    "id": 5,
	    "name": "Bay Area Garage",
	    "location": "202 Ocean Rd",
	    "city": "San Francisco",
	    "capacity": 250
	  },
	  {
	    "id": 6,
	    "name": "Sunny Garage",
	    "location": "303 Sunshine Dr",
	    "city": "Los Angeles",
	    "capacity": 100
	  },
	  {
	    "id": 7,
	    "name": "Top Garage",
	    "location": "205 Sunshine Dr",
	    "city": "Los Angeles",
	    "capacity": 60
	  }
	];

const maintenanceRecords = [
   {
       "id": 1,
       "carId": 1,
       "serviceType": "Fix",
       "scheduledDate": "2024-12-10",
       "garageId": 1,
   },
   {
       "id": 2,
       "carId": 5,
       "serviceType": "Fix",
       "scheduledDate": "2024-11-25",
       "garageId": 3,
   },
   {
       "id": 3,
       "carId": 4,
       "garageId": 1,
       "serviceType": "Oil change",
       "scheduledDate": "2024-12-18",
   },
   {
       "id": 4,
       "carId": 6,
       "garageId": 3,
       "serviceType": "Oil change",
       "scheduledDate": "2024-12-17",
   },
   {
       "id": 5,
       "carId": 5,
       "garageId": 3,
       "serviceType": "Oil change",
       "scheduledDate": "2024-12-16",
   },
   {
       "id": 6,
       "carId": 3,
       "garageId": 2,
       "serviceType": "Fix",
       "scheduledDate": "2024-12-14",
   },
   {
       "id": 7,
       "carId": 5,
       "garageId": 2,
       "serviceType": "Fix",
       "scheduledDate": "2024-12-14",
   },
   {
       "id": 8,
       "carId": 1,
       "garageId": 2,
       "serviceType": "Fix",
       "scheduledDate": "2024-12-12",
   }
]

module.exports = { cars, garages, maintenanceRecords };
