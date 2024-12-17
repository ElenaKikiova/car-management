const express = require("express");
const router = express.Router();
const {
    getAllMaintenanceRecords
} = require("../controllers/maintenanceController");

router.get("/", getAllMaintenanceRecords);

module.exports = router;
