const User = require("../models/User");
const Patient = require("../models/Patient");

const assignEarliestAppointment = async (req, res) => {
  try {
    return res.status(400).json({ message: "Transporter found" });
  } catch {
    return res.status(400).json({ message: "Transporter not found" });
  }
};
module.exports = {
  assignEarliestAppointment,
};
