const User = require("../models/User");
const Patient = require("../models/Patient");

const assignEarliestAppointment = async (req, res) => {
  try {
    const transporterId = req.user._id;

    // Fetch the transporter with necessary fields
    const transporter = await User.findById(transporterId, "requests");

    // Find the first patient with a pending appointment
    const patient = await Patient.findOne(
      { "appointments.status": "pending" },
      {
        name: 1,
        unit: 1,
        room: 1,
        appointments: { $elemMatch: { status: "pending" } },
      }
    );

    if (!patient || !patient.appointments.length) {
      return res.status(404).json({ message: "No pending appointments found" });
    }

    const pendingAppointment = patient.appointments[0]; // Grabs the first pending appointment

    // Assign the appointment to the transporter by pushing it into the requests array
    transporter.requests.push({
      patientId: patient._id,
      appointmentId: pendingAppointment._id,
      appointmentDetails: {
        date: pendingAppointment.date,
        time: pendingAppointment.time,
        type: pendingAppointment.type,
        status: pendingAppointment.status,
      },
    });

    // Mark the appointment as assigned
    pendingAppointment.status = "assigned";

    // Save both transporter and patient documents
    await transporter.save();
    await patient.save();

    // Respond with the transporter and assigned appointment details
    res.status(200).json({
      message: "Appointment assigned to transporter",
      transporter: { _id: transporter._id, requests: transporter.requests },
      patient: {
        _id: patient._id,
        name: patient.name,
        unit: patient.unit,
        room: patient.room,
      },
      appointment: pendingAppointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  assignEarliestAppointment,
};
