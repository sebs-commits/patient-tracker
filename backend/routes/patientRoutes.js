const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth");

const {
  addPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  addAppointment,
} = require("../controllers/patientController");

// General routes for CRUD operations
router.post("/patients", authenticate, authorize("admin"), addPatient);
router.get("/patients", authenticate, getPatients);
router.get("/patients/:id", authenticate, getPatientById);
router.put("/patients/:id", authenticate, authorize("admin"), updatePatient);
router.delete("/patients/:id", authenticate, authorize("admin"), deletePatient);
router.put("/patients/:id/appointments", authenticate, addAppointment);

module.exports = router;
