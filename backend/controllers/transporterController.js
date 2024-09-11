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
    if ((transporter.isAvailable = false)) {
      return res.status(404).json({ message: "Transporter assigned" });
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
    transporter.isAvailable = "false";

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
// Allows transporter to move from pending to complete
const completeRequest = async (req, res) => {
  try {
    const transporterId = req.user._id;

    // Find the transporter and populate the request details
    const transporter = await User.findById(transporterId).populate(
      "requests.patientId"
    );

    if (!transporter) {
      return res.status(404).json({ message: "Transporter not found" });
    }

    // Ensure there's a request to complete
    if (transporter.requests.length === 0) {
      return res.status(400).json({ message: "No active request to complete" });
    }

    const activeRequest = transporter.requests[0]; // Transporter can only pick up one request at a time

    // Update the appointment status to 'completed' in the Patient's record
    const patient = await Patient.findById(activeRequest.patientId);

    const appointment = patient.appointments.id(activeRequest.appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "completed";

    // Remove the request from the transporter and mark them as available
    transporter.requests = [];
    transporter.isAvailable = true;

    // Save the updated transporter and patient records
    await transporter.save();
    await patient.save();

    res.status(200).json({
      message: "Request completed successfully",
      transporter,
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  assignEarliestAppointment,
  completeRequest,
};
