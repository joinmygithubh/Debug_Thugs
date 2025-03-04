import React, { useState, useEffect } from "react";
import { db, ref, get, push, remove, update } from "../Components/firebaseConfig";

const IdeaBox = () => {
  const [ideas, setIdeas] = useState([]);
  const [newIdea, setNewIdea] = useState("");
  const [userName, setUserName] = useState(""); // Store user input for name
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // Fetch ideas from Realtime Database
  const fetchIdeas = async () => {
    try {
      const ideasRef = ref(db, "ideas");
      const snapshot = await get(ideasRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const ideasList = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setIdeas(ideasList);
      } else {
        setIdeas([]);
      }
    } catch (error) {
      console.error("Error fetching ideas:", error);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  // Add a new idea
  const addIdea = async () => {
    if (!newIdea.trim() || !userName.trim()) return;

    try {
      await push(ref(db, "ideas"), {
        text: newIdea,
        user: userName,
        timestamp: new Date().toISOString(), // Store timestamp
      });
      setNewIdea(""); 
      fetchIdeas();
    } catch (error) {
      console.error("Error adding idea:", error);
    }
  };

  // Delete an idea
  const deleteIdea = async (id) => {
    try {
      await remove(ref(db, `ideas/${id}`));
      fetchIdeas();
    } catch (error) {
      console.error("Error deleting idea:", error);
    }
  };

  // Update an idea
  const updateIdea = async () => {
    if (!editText.trim()) return;

    try {
      await update(ref(db, `ideas/${editId}`), { text: editText });
      setEditId(null);
      setEditText("");
      fetchIdeas();
    } catch (error) {
      console.error("Error updating idea:", error);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", maxWidth: "500px", margin: "auto" }}>
      <h2>💡 Idea Box</h2>

      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Enter your name"
        style={{ padding: "8px", marginRight: "5px", width: "45%" }}
      />
      <input
        type="text"
        value={newIdea}
        onChange={(e) => setNewIdea(e.target.value)}
        placeholder="Enter your idea"
        style={{ padding: "8px", marginRight: "5px", width: "45%" }}
      />
      <button onClick={addIdea} style={{ padding: "8px", cursor: "pointer" }}>Add Idea</button>

      <ul style={{ listStyle: "none", padding: "0", marginTop: "20px" }}>
        {ideas.map((idea) => (
          <li key={idea.id} style={{ margin: "10px 0", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}>
            {editId === idea.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{ padding: "5px", width: "60%" }}
                />
                <button onClick={updateIdea} style={{ marginLeft: "5px", cursor: "pointer" }}>Update</button>
                <button onClick={() => setEditId(null)} style={{ marginLeft: "5px", cursor: "pointer" }}>Cancel</button>
              </>
            ) : (
              <>
                <p><strong>{idea.text}</strong></p>
                <p style={{ fontSize: "12px", color: "gray" }}>
                  Created by: {idea.user || "Unknown"} | {new Date(idea.timestamp).toLocaleString()}
                </p>
                <button onClick={() => { setEditId(idea.id); setEditText(idea.text); }} style={{ marginLeft: "10px", cursor: "pointer" }}>Edit</button>
                <button onClick={() => deleteIdea(idea.id)} style={{ marginLeft: "5px", cursor: "pointer", color: "red" }}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IdeaBox;
