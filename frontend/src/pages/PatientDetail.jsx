import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPatientById } from "../api/patients";

const PatientDetail = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

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
    </div>
  );
};

export default PatientDetail;
