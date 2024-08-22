const express = require("express");
const router = express.Router();
const {
  addPatient,
  getPatients,
  updatePatient,
  deletePatient,
} = require("../controllers/patientController");

// POST: Add a new patient
router.post("/patients", addPatient);

// GET: Retrieve all patients
router.get("/patients", getPatients);

// PUT: Update patient details
router.put("/patients/:id", updatePatient);

// DELETE: Remove a patient
router.delete("/patients/:id", deletePatient);

module.exports = router;
