import axios from "axios";
// import _ from "lodash";
import { fetchAllPatients } from "./patients";

// Assign an appoint to logged in transporter
export const assignAppointment = async () => {
  try {
    const response = await axios.post(
      "/api/transporters/assign-appointment",
      {}, // Empty object bc not sending anything to request body
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error assigning patient appointment:",
      error.response || error.message
    );
    throw error;
  }
};
// Check if there are any pending requests
export const checkForPendingRequests = async () => {
  try {
    const patients = await fetchAllPatients();

    // Filter patients with pending appointments
    const patientsWithPending = patients.filter((patient) =>
      patient.appointments.some(
        (appointment) => appointment.status === "pending"
      )
    );

    return patientsWithPending; // Return the filtered list
  } catch (error) {
    console.error(
      "Error checking pending requests:",
      error.response || error.message
    );
    throw error;
  }
};
