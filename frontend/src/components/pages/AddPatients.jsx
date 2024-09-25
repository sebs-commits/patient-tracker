import { useState } from "react";
import { addPatient } from "../../api/patients";
import { useNavigate } from "react-router-dom";
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack } from "@chakra-ui/react";

const AddPatients = () => {
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
    <Box p="6" maxW="md" mx="auto" mt="10" borderWidth="1px" borderRadius="lg" boxShadow="lg" bg="blue.50">
      <Heading as="h2" size="lg" mb="6" color="blue.700">Add New Patient</Heading>
      <form onSubmit={handleFormSubmit}>
        <VStack spacing="4">
          <FormControl id="name" isRequired>
            <FormLabel color="blue.700">Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={newPatient.name}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="unit" isRequired>
            <FormLabel color="blue.700">Unit</FormLabel>
            <Input
              type="text"
              name="unit"
              value={newPatient.unit}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="room" isRequired>
            <FormLabel color="blue.700">Room</FormLabel>
            <Input
              type="text"
              name="room"
              value={newPatient.room}
              onChange={handleInputChange}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">Add Patient</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddPatients;