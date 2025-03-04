import React from "react";
import logo from "../Images/bot.jpeg";

function Bot({ toggleChat }) {
  return (
    <div style={styles.container} onClick={toggleChat}>  {/* ✅ Toggles chatbot */}
      <img src={logo} alt="AI Chatbot" style={styles.botImage} />
      <p>AI <span style={{ color: "purple", fontWeight: "bold" }}>ChatBot</span></p>
    </div>
  );
}

const styles = {
  container: { textAlign:"end",bottom: "20px", right: "20px",marginRight:"20px", cursor: "pointer" },
  botImage: { width: "80px", height: "80px", borderRadius: "50%" },
};

export default Bot;
