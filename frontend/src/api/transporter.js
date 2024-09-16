import axios from "axios";
// import _ from "lodash";
import { fetchAllPatients } from "./patients";

// Assign an appoint to logged in transporter
export const assignAppointment = async () => {
  try {
    const response = await axios.post(
      "/api/transporters/assign-appointment",
      {},
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

    return patientsWithPending;
  } catch (error) {
    console.error(
      "Error checking pending requests:",
      error.response || error.message
    );
    throw error;
  }
};
// Complete assigned request
export const completeRequest = async () => {
  try {
    const response = await axios.put(
      `/api/transporters/complete-request`, 
      {}, 
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
      "Error completing assignment:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
// Fetch the assigned appointment
export const getAssignedAppointment = async () => {
  try {
    const response = await axios.get(
      "/api/transporters/assigned-appointment",
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
      "Error fetching assigned appointment:",
      error.response || error.message
    );
    throw error;
  }
};