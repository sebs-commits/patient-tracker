import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transporter-dashboard" element={<TransporterDashboard />} />
          <Route path="/add-patient" element={<AddPatients />} />
          <Route path="/patients" element={<PatientList />} />
          <Route path="/patients/:id" element={<PatientDetail />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/settings" element={<Settings />} /> */}
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
