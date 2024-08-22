const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  type: { type: String, required: true },
});

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  healthcareID: { type: String, unique: true }, // Should be unique
  unit: { type: String, required: true },
  room: { type: String, required: true },
  appointments: [AppointmentSchema], // Use an array of AppointmentSchema
});

module.exports = mongoose.model("Patient", PatientSchema);
