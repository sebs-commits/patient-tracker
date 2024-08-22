const Patient = require("../models/Patient");

// Add a new patient
const addPatient = async (req, res) => {
  try {
    // Create a new patient without setting healthcareID
    let newPatient = new Patient(req.body);

    // Save the patient to generate the _id
    await newPatient.save();

    // Update the healthcareID to match the generated _id
    newPatient.healthcareID = newPatient._id;

    // Save the patient again with the healthcareID set to _id
    await newPatient.save();

    res.status(201).json(newPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all patients
const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a patient by ID
const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a patient by ID
const updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a patient by ID
const deletePatient = async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(204).json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
