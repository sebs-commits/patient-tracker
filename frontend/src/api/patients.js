import axios from "axios";

// Fetch all patients
export const fetchAllPatients = async () => {
  try {
    const response = await axios.get("/api/patients");
    return response.data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }
};

// Fetch a single patient by ID
export const fetchPatientById = async (id) => {
  try {
    const response = await axios.get(`/api/patients/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching patient:", error);
    throw error;
  }
};

// Add a new patient
export const addPatient = async (patientData) => {
  try {
    const response = await axios.post("/api/patients", patientData);
    return response.data;
  } catch (error) {
    console.error("Error adding patient:", error);
    throw error;
  }
};
// Add an appointment to a patient
export const addAppointment = async (id, appointmentData) => {
  try {
    const response = await axios.put(
      `/api/patients/${id}/appointments`,
      appointmentData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding appointment:", error);
    throw error;
  }
};

// Update a patient
export const updatePatient = async (id, updatedData) => {
  try {
    const response = await axios.put(`/api/patients/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating patient:", error);
    throw error;
  }
};

// Delete a patient (optional)
export const deletePatient = async (id) => {
  try {
    await axios.delete(`/api/patients/${id}`);
  } catch (error) {
    console.error("Error deleting patient:", error);
    throw error;
  }
};
