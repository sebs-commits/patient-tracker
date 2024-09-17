import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import TransporterDashboard from "./TransporterDashboard";

const Dashboard = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <p>No token found. Please log in.</p>;
  }

  try {
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;

    return (
      <div>
        <h2>Dashboard</h2>
        {role === "admin" ? (
          <div>
            <p>Welcome, Admin!</p>
            <Link to="/add-patient">Add Patient</Link>
            <Link to="/patients">Manage Patients</Link>
          </div>
        ) : (
          <div>
            <p>Welcome, Patient Transporter!</p>
            <TransporterDashboard />
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error decoding token:", error);
    return <p>Error decoding token. Please log in again.</p>;
  }
};

export default Dashboard;
