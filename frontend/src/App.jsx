import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import NavBar from "./components/layout/NavBar";
import Dashboard from "./components/pages/Dashboard";
import TransporterDashboard from "./components/pages/TransporterDashboard";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import AddPatients from "./components/pages/AddPatients";
import PatientList from "./components/pages/PatientList";
import PatientDetail from "./components/pages/PatientDetail";
//import Profile from "./components/pages/Profile";
//import Settings from "./components/pages/Settings";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <ChakraProvider>
      <Router>
        {isLoggedIn && <NavBar />}
        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/transporter-dashboard" element={isLoggedIn ? <TransporterDashboard /> : <Navigate to="/login" />} />
          <Route path="/add-patient" element={isLoggedIn ? <AddPatients /> : <Navigate to="/login" />} />
          <Route path="/patients" element={isLoggedIn ? <PatientList /> : <Navigate to="/login" />} />
          <Route path="/patients/:id" element={isLoggedIn ? <PatientDetail /> : <Navigate to="/login" />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/settings" element={<Settings />} /> */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
