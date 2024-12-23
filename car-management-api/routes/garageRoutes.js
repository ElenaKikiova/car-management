const express = require("express");
const router = express.Router();
const {
    getAllGarages,
    getGarageById,
    createGarage,
    updateGarage,
    deleteGarage,
    generateGarageReport
} = require("../controllers/garageController");

router.get("/", getAllGarages);
router.get("/dailyAvailabilityReport", generateGarageReport);
router.get("/:id", getGarageById);
router.post("/", createGarage);
router.put("/:id", updateGarage);
router.delete("/:id", deleteGarage);

module.exports = router;
