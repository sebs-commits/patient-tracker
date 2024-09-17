import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchPatientById,
  updatePatient,
  addAppointment,
} from "../../api/patients";

const PatientDetail = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editablePatient, setEditablePatient] = useState({
    name: "",
    unit: "",
    room: "",
    appointments: [],
  });
  const [newAppointment, setNewAppointment] = useState({
    date: "",
    time: "",
    type: "",
  });

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const data = await fetchPatientById(id);
        setPatient(data);
        setEditablePatient(data); // Initialize editablePatient with fetched data
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatient();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditablePatient(patient); // Revert changes by resetting to original patient data
  };

  const handleInputChange = (e) => {
    setEditablePatient({
      ...editablePatient,
      [e.target.name]: e.target.value,
    });
  };

  const handleAppointmentChange = (index, e) => {
    const updatedAppointments = [...editablePatient.appointments];
    updatedAppointments[index][e.target.name] = e.target.value;
    setEditablePatient({
      ...editablePatient,
      appointments: updatedAppointments,
    });
  };

  const handleRemoveAppointment = (index) => {
    const updatedAppointments = [...editablePatient.appointments];
    updatedAppointments.splice(index, 1); // Remove the appointment at the specified index
    setEditablePatient({
      ...editablePatient,
      appointments: updatedAppointments,
    });
  };

  const handleSaveChanges = async () => {
    try {
      const updatedPatient = await updatePatient(id, editablePatient);
      setPatient(updatedPatient);
      setIsEditing(false); // Exit edit mode after saving changes
    } catch (error) {
      console.error("Error saving patient details:", error);
    }
  };

  const handleNewAppointmentChange = (e) => {
    setNewAppointment({
      ...newAppointment,
      [e.target.name]: e.target.value,
    });
  };

  const handleNewAppointmentSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPatient = await addAppointment(id, newAppointment);
      setPatient(updatedPatient);
      setEditablePatient(updatedPatient);
      setNewAppointment({ date: "", time: "", type: "" }); // Reset the form
    } catch (error) {
      console.error("Error adding appointment:", error);
    }
  };

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="patient-detail-page">
      <h2>Patient Details</h2>

      <div>
        <p>
          <strong>Name:</strong>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editablePatient.name}
              onChange={handleInputChange}
            />
          ) : (
            patient.name
          )}
        </p>

        <p>
          <strong>Unit:</strong>
          {isEditing ? (
            <input
              type="text"
              name="unit"
              value={editablePatient.unit}
              onChange={handleInputChange}
            />
          ) : (
            patient.unit
          )}
        </p>

        <p>
          <strong>Room:</strong>
          {isEditing ? (
            <input
              type="text"
              name="room"
              value={editablePatient.room}
              onChange={handleInputChange}
            />
          ) : (
            patient.room
          )}
        </p>

        <p>
          <strong>Healthcare ID:</strong> {patient.healthcareID}
        </p>
      </div>

      <h3>Appointments</h3>
      <ul>
        {editablePatient.appointments.map((appt, index) => (
          <li key={index}>
            {isEditing ? (
              <div>
                <label>
                  Type:
                  <input
                    type="text"
                    name="type"
                    value={appt.type}
                    onChange={(e) => handleAppointmentChange(index, e)}
                  />
                </label>
                <label>
                  Date:
                  <input
                    type="date"
                    name="date"
                    value={appt.date.split("T")[0]} // Handle date format
                    onChange={(e) => handleAppointmentChange(index, e)}
                  />
                </label>
                <label>
                  Time:
                  <input
                    type="time"
                    name="time"
                    value={appt.time}
                    onChange={(e) => handleAppointmentChange(index, e)}
                  />
                </label>
                <button onClick={() => handleRemoveAppointment(index)}>
                  Remove
                </button>
              </div>
            ) : (
              <div>
                {appt.type} on {new Date(appt.date).toLocaleDateString()} at{" "}
                {appt.time}
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="add-appointment-form">
        <h3>Add Appointment</h3>
        <form onSubmit={handleNewAppointmentSubmit}>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={newAppointment.date}
              onChange={handleNewAppointmentChange}
              required
            />
          </label>
          <label>
            Time:
            <input
              type="time"
              name="time"
              value={newAppointment.time}
              onChange={handleNewAppointmentChange}
              required
            />
          </label>
          <label>
            Type:
            <input
              type="text"
              name="type"
              value={newAppointment.type}
              onChange={handleNewAppointmentChange}
              required
            />
          </label>
          <button type="submit">Add Appointment</button>
        </form>
      </div>

      {isEditing ? (
        <div>
          <button onClick={handleSaveChanges}>Save Changes</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
    </div>
  );
};

export default PatientDetail;
