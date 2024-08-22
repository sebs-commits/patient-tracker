const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  healthcareID: { type: String, required: true, unique: true },
  unit: { type: String, required: true },
  room: { type: String, required: true },
  appointments: [
    {
      date: { type: Date },
      type: { type: String },
    },
  ],
});

module.exports = mongoose.model("Patient", PatientSchema);
