import React, { useState, useEffect } from "react";
import { db, ref, get, push } from "./firebaseConfig";

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [commands, setCommands] = useState(null);

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const snapshot = await get(ref(db, "Commands"));
        if (snapshot.exists()) {
          setCommands(snapshot.val());
          console.log("✅ Commands loaded:", snapshot.val());
        } else {
          console.warn("⚠️ No commands found in Firebase.");
        }
      } catch (error) {
        console.error("❌ Error fetching commands:", error);
      }
    };
    fetchCommands();
  }, []);

  // ✅ Get the exact current hour
  const getGreetingBasedOnTime = () => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) return "Good morning!";
    if (hours >= 12 && hours < 18) return "Good afternoon!";
    if (hours >= 18 && hours < 22) return "Good evening!";
    return "Good night!";
  };

  const handleCommands = (command) => {
    if (!commands) {
      console.error("⚠️ Commands not loaded from Firebase!");
      return;
    }
  
    command = command.toLowerCase(); // Ensure case insensitivity
    console.log("🎤 User Command:", command);
  
    let responseText = "Sorry, I didn't understand that.";
  
    // ✅ Check if the command exists in Firebase
    if (Object.keys(commands).includes(command)) {
      responseText = commands[command]; // Fetch response from Firebase
    }
  
    // ✅ Recognizing greetings based on the time of day
    if (command.includes("good morning") || command.includes("good evening") || command.includes("good night") || command.includes("good afternoon")) {
      responseText = getGreetingBasedOnTime();
    }
  
    // ✅ Recognizing "hello"
    if (command.includes("hello")) {
      responseText = "Hello! How can I assist you today?";
    }
  
    // ✅ Opening Websites
    const siteCommands = {
      "open google": "https://www.google.com",
      "open youtube": "https://www.youtube.com",
      "open facebook": "https://www.facebook.com",
      "open instagram": "https://www.instagram.com",
      "open twitter": "https://twitter.com",
      "open linkedin": "https://www.linkedin.com",
      "open github": "https://github.com",
      "open whatsapp": "https://web.whatsapp.com",
      "open your developer profile":"https://www.linkedin.com/in/ankit1141"
    };
  
    if (siteCommands[command]) {
      responseText = `Opening ${command.split(" ")[1]}...`;
      window.open(siteCommands[command], "_blank");
    }
  
    if (command.includes("play music")) {
      responseText = "Playing music on YouTube...";
      window.open("https://www.youtube.com/results?search_query=relaxing+music", "_blank");
    }
    if (command.includes("open your developer profile")) {
      responseText = "sure! wait a momemnt here is my developer profile...";
      window.open("https://www.linkedin.com/in/ankit1141", "_blank");
    }
  
    if (command.includes("time")) {
      const currentTime = new Date().toLocaleTimeString();
      responseText = `The current time is: ${currentTime}`;
    }
  
    if (command.includes("date")) {
      const currentDate = new Date().toLocaleDateString();
      responseText = `Today's date is: ${currentDate}`;
    }
  
    push(ref(db, "ChatHistory"), { user: command, bot: responseText })
      .then(() => setChatHistory([...chatHistory, { user: command, bot: responseText }]))
      .catch((error) => console.error("❌ Error saving chat:", error));
  
    // ✅ Speak Response
    let speak = new SpeechSynthesisUtterance(responseText);
    speak.rate = 0.9;
    speak.lang = "en-IN";
    window.speechSynthesis.speak(speak);
  };
  const startVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("❌ Your browser doesn't support voice input.");
      return;
    }

    let recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      let spokenText = event.results[0][0].transcript.toLowerCase();
      console.log("🔊 Detected Voice:", spokenText);
      handleCommands(spokenText);
    };

    recognition.onerror = (event) => {
      console.error("❌ Speech Recognition Error:", event.error);
    };

    recognition.start();
  };

  return (
    <div id="chatContainer">
      <div id ="chatBox">
        {chatHistory.length === 0 ? <p>...</p> : chatHistory.map((chat, index) => (
          <div key={index}>
            <p id ="userText">👤 {chat.user}</p>
            <p id="botText">🤖 {chat.bot}</p>
          </div>
        ))}
      </div>
      <button onClick={startVoiceInput} id="chatbtn">🎤 Start Voice</button>
    </div>
  );
};



export default Chatbot;
