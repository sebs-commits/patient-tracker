const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  type: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "assigned", "completed"],
    default: "pending",
    required: true,
  }, // Add status field
});

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  healthcareID: { type: String, unique: true },
  unit: { type: String, required: true },
  room: { type: String, required: true },
  appointments: [AppointmentSchema],
});

module.exports = mongoose.model("Patient", PatientSchema);
