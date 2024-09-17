import { useState, useEffect } from "react";
import { fetchAllPatients } from "../../api/patients";
import { Link } from "react-router-dom";

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await fetchAllPatients();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="patient-list-page">
      <h2>All Patients</h2>
      <ul>
        {patients.map((patient) => (
          <li key={patient._id}>
            <Link to={`/patients/${patient._id}`}>{patient.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;
