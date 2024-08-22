const express = require("express");
const router = express.Router();

const {
  addPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  addAppointment,
} = require("../controllers/patientController");

// Define routes
router.post("/patients", addPatient);
router.get("/patients", getPatients);
router.get("/patients/:id", getPatientById);
router.put("/patients/:id", updatePatient);
router.delete("/patients/:id", deletePatient);
router.put("/patients/:id/appointments", addAppointment);
module.exports = router;
