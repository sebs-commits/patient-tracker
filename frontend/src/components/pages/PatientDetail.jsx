import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchPatientById,
  updatePatient,
  addAppointment,
} from "../../api/patients";
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, Text, HStack, Grid, GridItem } from "@chakra-ui/react";

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
    return <Text>Loading...</Text>;
  }

  return (
    <Box p="6" maxW={{ base: "md", lg: "2xl" }} mx="auto" mt="10" borderWidth="1px" borderRadius="lg" boxShadow="lg" bg="blue.50">
      <Heading as="h2" size="lg" mb="6" color="blue.700">Patient Details</Heading>
      <VStack spacing="4" width="full">
        <FormControl>
          <FormLabel color="blue.700">Name</FormLabel>
          {isEditing ? (
            <Input
              type="text"
              name="name"
              value={editablePatient.name}
              onChange={handleInputChange}
            />
          ) : (
            <Text>{patient.name}</Text>
          )}
        </FormControl>
        <FormControl>
          <FormLabel color="blue.700">Unit</FormLabel>
          {isEditing ? (
            <Input
              type="text"
              name="unit"
              value={editablePatient.unit}
              onChange={handleInputChange}
            />
          ) : (
            <Text>{patient.unit}</Text>
          )}
        </FormControl>
        <FormControl>
          <FormLabel color="blue.700">Room</FormLabel>
          {isEditing ? (
            <Input
              type="text"
              name="room"
              value={editablePatient.room}
              onChange={handleInputChange}
            />
          ) : (
            <Text>{patient.room}</Text>
          )}
        </FormControl>
        <Text><strong>Healthcare ID:</strong> {patient.healthcareID}</Text>
      </VStack>

      <Heading as="h3" size="md" mt="6" mb="4" color="blue.700">Appointments</Heading>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} width="full">
        {editablePatient.appointments.map((appt, index) => (
          <GridItem key={index} p="4" borderWidth="1px" borderRadius="lg" bg="white" width="full">
            {isEditing ? (
              <VStack spacing="2" width="full">
                <FormControl>
                  <FormLabel color="blue.700">Type</FormLabel>
                  <Input
                    type="text"
                    name="type"
                    value={appt.type}
                    onChange={(e) => handleAppointmentChange(index, e)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel color="blue.700">Date</FormLabel>
                  <Input
                    type="date"
                    name="date"
                    value={appt.date.split("T")[0]} // Handle date format
                    onChange={(e) => handleAppointmentChange(index, e)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel color="blue.700">Time</FormLabel>
                  <Input
                    type="time"
                    name="time"
                    value={appt.time}
                    onChange={(e) => handleAppointmentChange(index, e)}
                  />
                </FormControl>
                <Button colorScheme="red" onClick={() => handleRemoveAppointment(index)}>Remove</Button>
              </VStack>
            ) : (
              <Text>{appt.type} on {new Date(appt.date).toLocaleDateString()} at {appt.time}</Text>
            )}
          </GridItem>
        ))}
      </Grid>

      <Box mt="6" width="full">
        <Heading as="h3" size="md" mb="4" color="blue.700">Add Appointment</Heading>
        <form onSubmit={handleNewAppointmentSubmit}>
          <VStack spacing="4" width="full">
            <FormControl isRequired>
              <FormLabel color="blue.700">Date</FormLabel>
              <Input
                type="date"
                name="date"
                value={newAppointment.date}
                onChange={handleNewAppointmentChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="blue.700">Time</FormLabel>
              <Input
                type="time"
                name="time"
                value={newAppointment.time}
                onChange={handleNewAppointmentChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="blue.700">Type</FormLabel>
              <Input
                type="text"
                name="type"
                value={newAppointment.type}
                onChange={handleNewAppointmentChange}
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full">Add Appointment</Button>
          </VStack>
        </form>
      </Box>

      <HStack mt="6" spacing="4" width="full">
        {isEditing ? (
          <>
            <Button colorScheme="blue" onClick={handleSaveChanges}>Save Changes</Button>
            <Button colorScheme="gray" onClick={handleCancelEdit}>Cancel</Button>
          </>
        ) : (
          <Button colorScheme="blue" onClick={handleEditClick}>Edit</Button>
        )}
      </HStack>
    </Box>
  );
};

export default PatientDetail;
