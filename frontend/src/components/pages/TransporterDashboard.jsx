import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  assignAppointment,
  checkForPendingRequests,
  completeRequest,
  getAssignedAppointment,
} from "../../api/transporter";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";

const TransporterDashboard = () => {
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([]);

  const bgColor = useColorModeValue("blue.50", "blue.900");
  const textColor = useColorModeValue("blue.700", "blue.100");

  const fetchAssignedAppointment = async () => {
    try {
      const response = await getAssignedAppointment();
      if (response.request) {
        setAppointment(response.request);
        localStorage.setItem("appointment", JSON.stringify(response.request));
      } else {
        setAppointment(null);
        localStorage.removeItem("appointment");
      }
    } catch (err) {
      console.error("Error fetching assigned appointment:", err);
      toast.error("Unable to fetch assigned appointment. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        setLoading(true);
        const requests = await checkForPendingRequests();
        setPendingRequests(requests);
        if (requests.length === 0) {
          toast.info("No pending requests found.");
        }
      } catch (err) {
        console.error("Error checking pending requests:", err);
        toast.error("Unable to fetch pending requests. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRequests();
    fetchAssignedAppointment();

    const storedAppointment = localStorage.getItem("appointment");
    if (storedAppointment) {
      setAppointment(JSON.parse(storedAppointment));
    }
  }, []);

  const handleAssignAppointment = async () => {
    setLoading(true);
    try {
      const response = await assignAppointment();
      if (response) {
        setAppointment(response);
        localStorage.setItem("appointment", JSON.stringify(response));
        toast.success("Appointment assigned successfully!");
        await fetchAssignedAppointment();
      } else {
        setAppointment(null);
        localStorage.removeItem("appointment");
      }
    } catch (err) {
      console.error("Error assigning appointment:", err);
      toast.error("Unable to assign appointment. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteAppointment = async () => {
    setLoadingComplete(true);
    try {
      await completeRequest();
      setAppointment(null);
      localStorage.removeItem("appointment");
      toast.success("Transporter has completed the request successfully.");
    } catch (err) {
      console.error("Error completing appointment:", err);
      toast.error("Unable to complete appointment. Please try again later.");
    } finally {
      setLoadingComplete(false);
    }
  };

  return (
    <Box p="6" maxW="4xl" mx="auto" mt="10" borderWidth="1px" borderRadius="lg" boxShadow="lg" bg={bgColor}>
      <Heading as="h2" size="lg" mb="6" color={textColor}>Patient Transporter Dashboard</Heading>
      <VStack spacing="4" align="stretch">
        {loading ? (
          <HStack justify="center">
            <Spinner />
            <Text>Loading...</Text>
          </HStack>
        ) : (
          <>
            {!appointment && pendingRequests.length > 0 && (
              <Button onClick={handleAssignAppointment} colorScheme="blue">
                Assign Earliest Appointment
              </Button>
            )}
            {appointment && appointment.patientId && (
              <Box borderWidth="1px" borderRadius="md" p="4">
                <Heading as="h3" size="md" mb="2">Appointment Assigned:</Heading>
                <Text><strong>Patient Name:</strong> {appointment.patientId.name}</Text>
                <Text><strong>Pickup Location:</strong> {appointment.patientId.unit}, Room {appointment.patientId.room}</Text>
                <Text><strong>Drop-off Location:</strong> {appointment.appointmentDetails.type}</Text>
                <Text><strong>Status:</strong> {appointment.appointmentDetails.status}</Text>
                <Button 
                  onClick={handleCompleteAppointment} 
                  isLoading={loadingComplete}
                  loadingText="Completing..."
                  colorScheme="green" 
                  mt="4"
                >
                  Complete Request
                </Button>
              </Box>
            )}
          </>
        )}
      </VStack>
      <ToastContainer />
    </Box>
  );
};

export default TransporterDashboard;