import React, { useState, useEffect } from "react";
import axios from "axios";
import { MessageCircleMore, UserPlus } from "lucide-react";

const UserProfile = () => {
  const [users, setUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState(10); // Show 10 users initially
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://debugthugs-5a369-default-rtdb.firebaseio.com/users.json")
      .then((response) => {
        if (response.data) {
          const formattedUsers = Object.keys(response.data)
            .map((key) => {
              const user = response.data[key];
              if (!user) return null;

              const lastSeenTimestamp = Date.now() - Math.random() * 1000000000;
              const lastSeenDate = new Date(lastSeenTimestamp);
              const now = new Date();
              const timeDiff = now - lastSeenDate;
              const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
              const isActive = timeDiff < 5 * 60 * 1000; // Active within last 5 minutes

              let lastSeenText;
              if (isActive) {
                lastSeenText = "🟢 Active now";
              } else if (daysDiff === 0) {
                lastSeenText = `Last Seen: ${lastSeenDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}`;
              } else if (daysDiff === 1) {
                lastSeenText = `Last Seen: Yesterday at ${lastSeenDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}`;
              } else {
                lastSeenText = `Last Seen: ${daysDiff} days ago`;
              }

              return {
                id: key,
                name: user.full_name || "Unknown",
                avatar: user.Avatar || "https://via.placeholder.com/100",
                interest: user.interested || "No interests provided",
                lastSeen: lastSeenText,
                isActive,
              };
            })
            .filter(Boolean); // Remove null values

          setUsers(formattedUsers);
        }
      })
      .catch((error) => console.error("Error fetching users:", error))
      .finally(() => setLoading(false));
  }, []);

  // Load more users when button is clicked
  const handleShowMore = () => {
    setVisibleUsers((prev) => prev + 10);
  };

  return (
    <div >
         <h1>Collaborators</h1>
      <div id="collaborators">
      {loading ? (
        <p>Loading users...</p>
      ) : users.length > 0 ? (
        <>
          {users.slice(0, visibleUsers).map((user) => (
            <div key={user.id} id="card">
              <div id="profile">
                <img src={user.avatar} alt={user.name} id="avatar" />
                <h2>{user.name}</h2>
              </div>
              <div id="p2">
                <p id="para">
                  <span id="p1">Capabilities:</span> {user.interest}
                </p>
              </div>
              <div>
                <p style={{ color: user.isActive ? "green" : "black" }}>
                  <span id="p3">{user.lastSeen}</span>
                </p>
              </div>
              <div>
                <button id="button">
                  <UserPlus />
                </button>
                <button id="button1">
                  <MessageCircleMore />
                </button>
              </div>
            </div>
          ))}
          
        </>
      ) : (
        <p>No users found.</p>
      )}
      
      </div>
      {visibleUsers < users.length && (
            <button onClick={handleShowMore} id="chatbtn">
              Show More
            </button>
          )}
    </div>
    
  );
};

export default UserProfile;
