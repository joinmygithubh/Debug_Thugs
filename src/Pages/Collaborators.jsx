import React from "react";
import "../App.css";
import Collaboration from "../assets/Collaboration.svg";

import UserProfile from "./UserProfile";
// import Chatbot from "../Components/Chatbot";


const Collaborators = () => {
  return (
    <div className="collaborate">
      <img src={Collaboration} alt="collaboration-image" />
      <div className="collaborate text-content">
        <h1>Let's Collaborate!</h1>
        <p>
          Collaboration is the foundation of innovation and success. When minds
          unite, ideas flourish, challenges become opportunities, and goals turn
          into achievements. True teamwork is built on trust, respect, and
          shared vision. Together, we can accomplish more than we ever could
          alone.

        </p>

      </div>
      <UserProfile/>
    </div>
  );
};

export default Collaborators;
