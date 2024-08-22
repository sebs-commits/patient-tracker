const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  healthcareID: { type: String, required: false, unique: true },
  unit: { type: String, required: true },
  room: { type: String, required: true },
  appointments: [
    {
      date: { type: Date },
      time: { type: String },
      type: { type: String },
    },
  ],
});

module.exports = mongoose.model("Patient", PatientSchema);
