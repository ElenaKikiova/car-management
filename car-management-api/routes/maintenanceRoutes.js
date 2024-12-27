const express = require("express");
const router = express.Router();
const {
    getAllMaintenanceRecords,
    getMaintenanceRecordById,
    createMaintenanceRecord,
    updateMaintenanceRecord,
    deleteMaintenanceRecord,
    generateMonthlyRequestsReport
} = require("../controllers/maintenanceController");

router.get("/", getAllMaintenanceRecords);
router.get("/monthlyRequestsReport", generateMonthlyRequestsReport);
router.get("/:id", getMaintenanceRecordById);
router.post("/", createMaintenanceRecord);
router.put("/:id", updateMaintenanceRecord);
router.delete("/:id", deleteMaintenanceRecord);

module.exports = router;
