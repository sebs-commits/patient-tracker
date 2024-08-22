import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPatientById, addAppointment } from "../api/patients";

const PatientDetail = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [appointment, setAppointment] = useState({
    date: "",
    time: "",
    type: "",
  });

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const data = await fetchPatientById(id);
        setPatient(data);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatient();
  }, [id]);

  const handleAppointmentChange = (e) => {
    setAppointment({
      ...appointment,
      [e.target.name]: e.target.value,
    });
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPatient = await addAppointment(id, appointment);
      setPatient(updatedPatient); // Update the patient with the new appointment
      setAppointment({ date: "", time: "", type: "" }); // Reset the form
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
      <p>
        <strong>Name:</strong> {patient.name}
      </p>
      <p>
        <strong>Unit:</strong> {patient.unit}
      </p>
      <p>
        <strong>Room:</strong> {patient.room}
      </p>
      <p>
        <strong>Healthcare ID:</strong> {patient.healthcareID}
      </p>

      {/* List existing appointments */}
      <h3>Appointments</h3>
      <ul>
        {patient.appointments && patient.appointments.length > 0 ? (
          patient.appointments.map((appt, index) => (
            <li key={index}>
              {appt.type} on {new Date(appt.date).toLocaleDateString()} at{" "}
              {appt.time}{" "}
            </li>
          ))
        ) : (
          <li>No appointments</li>
        )}
      </ul>

      {/* Form to add a new appointment */}
      <div className="add-appointment-form">
        <h3>Add Appointment</h3>
        <form onSubmit={handleAppointmentSubmit}>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={appointment.date}
              onChange={handleAppointmentChange}
              required
            />
          </label>
          <label>
            Time:
            <input
              type="time"
              name="time"
              value={appointment.time}
              onChange={handleAppointmentChange}
              required
            />
          </label>
          <label>
            Type:
            <input
              type="text"
              name="type"
              value={appointment.type}
              onChange={handleAppointmentChange}
              required
            />
          </label>
          <button type="submit">Add Appointment</button>
        </form>
      </div>
    </div>
  );
};

export default PatientDetail;
