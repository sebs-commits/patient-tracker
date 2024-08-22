import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <Link to="/add-patient">Add Patient</Link>
      <Link to="/patients">View Patients</Link>
    </nav>
  );
};
export default NavBar;
