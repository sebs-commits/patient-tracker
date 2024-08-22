import { useState, useEffect } from "react";
import axios from "axios";
//import "./AdminPage.css";

const AdminPage = () => {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    name: "",
    unit: "",
    room: "",
  });

  // Fetch all patients from the backend
  useEffect(() => {
    axios
      .get("/api/patients")
      .then((response) => setPatients(response.data))
      .catch((error) => console.error("Error fetching patients:", error));
  }, []);

  // Handle input change for new patient
  const handleInputChange = (e) => {
    setNewPatient({
      ...newPatient,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission to add a new patient
  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/patients", newPatient)
      .then((response) => {
        setPatients([...patients, response.data]); // Add the new patient to the list
        setNewPatient({ name: "", unit: "", room: "" }); // Reset the form
      })
      .catch((error) => console.error("Error adding patient:", error));
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      <div className="patient-list">
        <h2>All Patients</h2>
        <ul>
          {patients.map((patient) => (
            <li key={patient.healthcareID}>
              <strong>{patient.name}</strong> - {patient.unit}, Room{" "}
              {patient.room}
            </li>
          ))}
        </ul>
      </div>

      <div className="add-patient-form">
        <h2>Add New Patient</h2>
        <form onSubmit={handleFormSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={newPatient.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Unit:
            <input
              type="text"
              name="unit"
              value={newPatient.unit}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Room:
            <input
              type="text"
              name="room"
              value={newPatient.room}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">Add Patient</button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
