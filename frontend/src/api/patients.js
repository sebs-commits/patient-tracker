import axios from "axios";

// Fetch all patients
export const fetchAllPatients = async () => {
  try {
    const response = await axios.get("/api/patients", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if required
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching patients:", error.response || error.message);
    throw error;
  }
};

// Fetch a single patient by ID
export const fetchPatientById = async (id) => {
  try {
    const response = await axios.get(`/api/patients/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if required
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching patient:", error.response || error.message);
    throw error;
  }
};

// Add a new patient
export const addPatient = async (patientData) => {
  try {
    const response = await axios.post("/api/patients", patientData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if required
        "Content-Type": "application/json", // Ensure the content type is set
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding patient:", error.response || error.message);
    throw error;
  }
};

// Add an appointment to a patient
export const addAppointment = async (id, appointmentData) => {
  try {
    const response = await axios.put(
      `/api/patients/${id}/appointments`,
      appointmentData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if required
          "Content-Type": "application/json", // Ensure the content type is set
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding appointment:", error.response || error.message);
    throw error;
  }
};

// Update a patient
export const updatePatient = async (id, updatedData) => {
  try {
    const response = await axios.put(`/api/patients/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if required
        "Content-Type": "application/json", // Ensure the content type is set
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating patient:", error.response || error.message);
    throw error;
  }
};

// Delete a patient
export const deletePatient = async (id) => {
  try {
    await axios.delete(`/api/patients/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if required
      },
    });
  } catch (error) {
    console.error("Error deleting patient:", error.response || error.message);
    throw error;
  }
};
