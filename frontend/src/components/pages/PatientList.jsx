import { useState, useEffect } from "react";
import { fetchAllPatients } from "../../api/patients";
import { Link } from "react-router-dom";
import { Box, Heading, Button, Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

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
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Unit</Th>
            <Th>Room</Th>
            <Th>Healthcare ID</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {patients.map((patient) => (
            <Tr key={patient._id}>
              <Td>
                <Link to={`/patients/${patient._id}`}>
                  <Text color="blue.700">{patient.name}</Text>
                </Link>
              </Td>
              <Td>{patient.unit}</Td>
              <Td>{patient.room}</Td>
              <Td>{patient.healthcareID}</Td>
              <Td>
                <Link to={`/patients/${patient._id}`}>
                  <Button colorScheme="blue" size="sm">View Details</Button>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default PatientList;
