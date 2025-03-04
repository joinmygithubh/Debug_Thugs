import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Collaborators from './pages/Collaborators';
import ShareIdeas from './pages/ShareIdeas';
import Navbar from './Navbar';
import ProfileSection from './pages/ProfileSection';
import Chatbot from './Components/Chatbot';  // ✅ Import Chatbot
import Bot from './Components/Bot';  // ✅ Import Bot component
import Footer from './Footer';


function App() {
  const [showChatbot, setShowChatbot] = useState(false);  // ✅ State to toggle chatbot

  const toggleChat = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <div className='header'>
      <Navbar />  {/* ✅ Navbar is always visible */}

      <div className='section-2'>
        {/* ✅ Routes for page navigation */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collaborators" element={<Collaborators />} />
          <Route path="/share-ideas" element={<ShareIdeas />} />
          <Route path="/profile-section" element={<ProfileSection />} />
        </Routes>

        {/* ✅ Chatbot overlay (only visible when showChatbot is true) */}
        {showChatbot && <Chatbot />}

        {/* ✅ Bot is always visible and toggles chatbot */}
        <Bot toggleChat={toggleChat} />
      </div>
    <Footer/>
    </div>
  );
}

export default App;
