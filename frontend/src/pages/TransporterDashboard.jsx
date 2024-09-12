import { useState, useEffect } from "react";
import {
  assignAppointment,
  checkForPendingRequests,
  completeRequest,
} from "../api/transporter";

const TransporterDashboard = () => {
  const [appointment, setAppointment] = useState(null);
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [error, setError] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [completionMessage, setCompletionMessage] = useState(null); 

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        setLoading(true);
        const requests = await checkForPendingRequests();
        setPendingRequests(requests);
        if (requests.length === 0) {
          setError("No pending requests found.");
        }
      } catch (err) {
        console.error("Error checking pending requests:", err); 
        setError("Unable to fetch pending requests. Please try again later."); 
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRequests();

    // Retrieve appointment from localStorage
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
      setAppointment(response);
      // Store appointment in localStorage
      localStorage.setItem("appointment", JSON.stringify(response));
    } catch (err) {
      console.error("Error assigning appointment:", err); 
      setError("Unable to assign appointment. Please try again later."); 
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
      setCompletionMessage("Transporter has completed the request successfully."); 
    } catch (err) {
      console.error("Error completing appointment:", err); 
      setError("Unable to complete appointment. Please try again later."); 
    } finally {
      setLoadingComplete(false);
    }
  };

  return (
    <div>
      <h2>Patient Transporter Dashboard</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "cyan" }}>{error}</p>}
      {/* Display no pending requests */}
      {/* {!loading && pendingRequests.length === 0 && (
        <p>No pending requests available.</p>
      )} */}
      {/* Assign appointment button */}
      {!loading && pendingRequests.length > 0 && !appointment && (
        <button onClick={handleAssignAppointment}>
          Assign Earliest Appointment
        </button>
      )}
      {/* Appointment details */}
      {appointment && (
        <div>
          <h3>Appointment Assigned:</h3>
          <p>
            <strong>Patient Name:</strong> {appointment.patient.name}
          </p>
          <p>
            <strong>Pickup Location:</strong> {appointment.patient.unit}, Room{" "}
            {appointment.patient.room}
          </p>
          <p>
            <strong>Drop-off Location:</strong> {appointment.appointment.type}
          </p>
          <p>
            <strong>Status:</strong> {appointment.appointment.status}
          </p>
          {/* Complete request button */}
          <button onClick={handleCompleteAppointment}>
            {loadingComplete ? "Completing..." : "Complete Request"}
          </button>
        </div>
      )}
      {/* Show completed request if available */}
      {completionMessage && (
        <div>
          <h3>Request Completed:</h3>
          <p>{completionMessage}</p>
        </div>
      )}
    </div>
  );
};

export default TransporterDashboard;
