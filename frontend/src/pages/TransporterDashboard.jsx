import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  assignAppointment,
  checkForPendingRequests,
  completeRequest,
  getAssignedAppointment,
} from "../api/transporter";

const TransporterDashboard = () => {
  const [appointment, setAppointment] = useState(null);
  const [, setRequest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [, setError] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);

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
        toast.error(
          "Unable to fetch pending requests. Please try again later."
        );
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
    setError(null);

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
    setError(null);

    try {
      const response = await completeRequest();
      setRequest(response);
      setAppointment(null);
      localStorage.removeItem("appointment");
      toast.success("Transporter has completed the request successfully.");
      // Removed fetchAssignedAppointment call
    } catch (err) {
      console.error("Error completing appointment:", err);
      toast.error("Unable to complete appointment. Please try again later.");
    } finally {
      setLoadingComplete(false);
    }
  };

  return (
    <div>
      <h2>Patient Transporter Dashboard</h2>
      {loading && <p>Loading...</p>}
      {!loading && pendingRequests.length > 0 && !appointment && (
        <button onClick={handleAssignAppointment}>
          Assign Earliest Appointment
        </button>
      )}
      {appointment && appointment.patientId && (
        <div>
          <h3>Appointment Assigned:</h3>
          <p>
            <strong>Patient Name:</strong> {appointment.patientId.name}
          </p>
          <p>
            <strong>Pickup Location:</strong> {appointment.patientId.unit}, Room{" "}
            {appointment.patientId.room}
          </p>
          <p>
            <strong>Drop-off Location:</strong> {appointment.appointmentDetails.type}
          </p>
          <p>
            <strong>Status:</strong> {appointment.appointmentDetails.status}
          </p>
          <button onClick={handleCompleteAppointment}>
            {loadingComplete ? "Completing..." : "Complete Request"}
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default TransporterDashboard;

// this has now become a clusterfuck..... i need to reorganize this, or make it easier to read lmao