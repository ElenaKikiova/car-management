const express = require("express");
const router = express.Router();
const {
    getAllMaintenanceRecords,
    getMaintenanceRecordById,
    createMaintenanceRecord,
    updateMaintenanceRecord,
    deleteMaintenanceRecord
} = require("../controllers/maintenanceController");

router.get("/", getAllMaintenanceRecords);
router.get("/:id", getMaintenanceRecordById);
router.post("/", createMaintenanceRecord);
router.put("/:id", updateMaintenanceRecord);
router.delete("/:id", deleteMaintenanceRecord);

module.exports = router;
