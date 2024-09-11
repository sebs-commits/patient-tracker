import { useState, useEffect } from "react";
import {
  assignAppointment,
  checkForPendingRequests,
  completeRequest,
} from "../api/transporter";

const TransporterDashboard = () => {
  const [appointment, setAppointment] = useState(null);
  const [setRequest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        setLoading(true);
        const requests = await checkForPendingRequests();
        setPendingRequests(requests);
        if (requests.length === 0) {
          // Handle no pending requests here
          setError("No pending requests found.");
        }
      } catch (err) {
        setError("Error checking pending requests: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRequests(); // Fetch pending requests on component mount
  }, []);

  const handleAssignAppointment = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await assignAppointment();
      setAppointment(response);
    } catch (err) {
      setError("Error assigning appointment: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteAppointment = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await completeRequest();
      setRequest(response);
    } catch (err) {
      setError("Error completing appointment: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Patient Transporter Dashboard</h2>
      {loading && <p>Loading...</p>}
      {/* {error && <p style={{ color: "red" }}>{error}</p>}{" "} */}
      {/* Check if there are pending requests */}
      {!loading && pendingRequests.length === 0 && (
        <p>No pending requests available.</p>
      )}
      {!loading && pendingRequests.length > 0 && !appointment && (
        <button onClick={handleAssignAppointment}>
          Assign Earliest Appointment
        </button>
      )}
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
          <button onClick={handleCompleteAppointment}>Complete Request</button>
        </div>
      )}
    </div>
  );
};

export default TransporterDashboard;
