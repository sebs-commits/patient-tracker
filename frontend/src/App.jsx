import "./App.css";
//import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddPatients from "./pages/addPatients";
import NavBar from "../components/NavBar";
import PatientList from "./pages/PatientList";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar></NavBar>
        <Routes>
          <Route path="/add-patient" element={<AddPatients />} />
          <Route path="/patients" element={<PatientList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
