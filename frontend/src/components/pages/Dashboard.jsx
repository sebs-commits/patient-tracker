import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import TransporterDashboard from "./TransporterDashboard";
import PatientList from "./PatientList"; // Import PatientList
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";

const Dashboard = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Text>No token found. Please log in.</Text>;
  }

  try {
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;

    return (
      <Box p="6" maxW="4xl" mx="auto" mt="10" borderWidth="1px" borderRadius="lg" boxShadow="lg" bg="blue.50">
        <Heading as="h2" size="lg" mb="6" color="blue.700">Dashboard</Heading>
        {role === "admin" ? (
          <VStack spacing="4" width="full">
            <Text color="blue.700">Welcome, Admin!</Text>
            <Button as={Link} to="/add-patient" colorScheme="blue" width="full">Add Patient</Button>
            <Button as={Link} to="/patients" colorScheme="blue" width="full">Manage Patients</Button>
            <PatientList /> {/* Include PatientList */}
          </VStack>
        ) : (
          <VStack spacing="4" width="full">
            <Text color="blue.700">Welcome, Patient Transporter!</Text>
            <TransporterDashboard />
          </VStack>
        )}
      </Box>
    );
  } catch (error) {
    console.error("Error decoding token:", error);
    return <Text>Error decoding token. Please log in again.</Text>;
  }
};

export default Dashboard;
