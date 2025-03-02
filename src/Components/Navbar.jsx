import { CircleUserRound } from "lucide-react";
import logo from "../Images/logo.png"; // Correct import for src folder

const Navbar = () => {
  return (
    <div>
      <div id="navbar">
        <div id="nav-logo">
          <img src={logo} alt="Logo" /> {/* Use imported image */}
         
        </div>
        <div id="nav-right">
          <a href="#">Home</a>
          <a href="#">Collaborators</a>
          <a href="#">Share your ideas</a>
          <a href="#">
            <CircleUserRound size={24} />
          </a>
         
        </div>
      </div>
    </div>
  );
};

export default Navbar;
