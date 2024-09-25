import { useState, useEffect } from "react";
import { fetchAllPatients } from "../../api/patients";
import { Link } from "react-router-dom";
import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";

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
      <List spacing="4">
        {patients.map((patient) => (
          <ListItem key={patient._id} p="4" borderWidth="1px" borderRadius="lg" bg="white">
            <Link to={`/patients/${patient._id}`}>
              <Text color="blue.700">{patient.name}</Text>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PatientList;
