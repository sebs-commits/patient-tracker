import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "./components/layout/NavBar";
import Dashboard from "./components/pages/Dashboard";
import TransporterDashboard from "./components/pages/TransporterDashboard";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
// Import other components as needed

function App() {
  return (
    <ChakraProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transporter-dashboard" element={<TransporterDashboard />} />
          {/* Add other routes as needed */}
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
