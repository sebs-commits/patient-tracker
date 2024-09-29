import { useState, useEffect } from "react";
import { fetchAllPatients } from "../../api/patients";
import { Link } from "react-router-dom";
import { Box, Heading, Button, Text } from "@chakra-ui/react";

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
    <Box p="6" width="full" borderWidth="1px" borderRadius="lg" boxShadow="lg" bg="blue.50">
      <Heading as="h2" size="lg" mb="6" color="blue.700">All Patients</Heading>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid", padding: "8px", textAlign: "left" }}>Name</th>
            <th style={{ border: "1px solid", padding: "8px", textAlign: "left" }}>Unit</th>
            <th style={{ border: "1px solid", padding: "8px", textAlign: "left" }}>Room</th>
            <th style={{ border: "1px solid", padding: "8px", textAlign: "left" }}>Healthcare ID</th>
            <th style={{ border: "1px solid", padding: "8px", textAlign: "left" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient._id}>
              <td style={{ border: "1px solid", padding: "8px" }}>
                <Link to={`/patients/${patient._id}`}>
                  <Text color="blue.700">{patient.name}</Text>
                </Link>
              </td>
              <td style={{ border: "1px solid", padding: "8px" }}>{patient.unit}</td>
              <td style={{ border: "1px solid", padding: "8px" }}>{patient.room}</td>
              <td style={{ border: "1px solid", padding: "8px" }}>{patient.healthcareID}</td>
              <td style={{ border: "1px solid", padding: "8px" }}>
                <Link to={`/patients/${patient._id}`}>
                  <Button colorScheme="blue">View Details</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export default PatientList;
