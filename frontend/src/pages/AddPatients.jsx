import { useState } from "react";
import { addPatient } from "../api/patients";
import { useNavigate } from "react-router-dom";

const AddPatient = () => {
  const [newPatient, setNewPatient] = useState({
    name: "",
    unit: "",
    room: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setNewPatient({
      ...newPatient,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPatient(newPatient);
      navigate("/patients"); // Redirect to the patient list page
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  return (
    <div className="add-patient-page">
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
  );
};

export default AddPatient;
