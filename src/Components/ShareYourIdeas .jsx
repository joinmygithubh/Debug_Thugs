import React, { useState, useEffect } from "react";
import { db, ref, push, onValue, remove, update } from "./firebaseConfig";
import { auth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./ShareYourIdeas.css"; // Import CSS file

const ShareYourIdeas = () => {
  const [user, setUser] = useState(null);
  const [idea, setIdea] = useState("");
  const [ideas, setIdeas] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // ✅ Google Login
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  // ✅ Fetch Ideas in Real-Time
  useEffect(() => {
    const ideasRef = ref(db, "ideas");
    onValue(ideasRef, (snapshot) => {
      if (snapshot.exists()) {
        setIdeas(Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data })));
      } else {
        setIdeas([]);
      }
    });
  }, []);

  // ✅ Add Idea
  const postIdea = () => {
    if (idea.trim() === "") return;

    push(ref(db, "ideas"), {
      user: user.displayName,
      idea: idea,
      timestamp: Date.now(),
    });

    setIdea("");
  };

  // ✅ Delete Idea
  const deleteIdea = (id) => {
    remove(ref(db, `ideas/${id}`));
  };

  // ✅ Edit Idea
  const startEditing = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    if (editText.trim() === "") return;
    update(ref(db, `ideas/${editId}`), { idea: editText });
    setEditId(null);
    setEditText("");
  };

  return (
    <div className="container1">
      {!user ? (
        <button onClick={handleLogin} className="login-button">Sign in with Google</button>
      ) : (
        <>
          <h2 className="title">Share Your Ideas</h2>
          <div className="input-container">
            <input
              type="text"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Share your idea..."
              className="input-field"
            />
            <button onClick={postIdea} className="button">Post</button>
          </div>

          <div className="ideas-container">
            {ideas.map(({ id, user, idea }) => (
              <div key={id} className="idea-card">
                <p><strong>{user}:</strong> {editId === id ? (
                  <>
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="edit-input"
                    />
                    <button onClick={saveEdit} className="save-button">Save</button>
                  </>
                ) : idea}</p>

                {auth.currentUser?.displayName === user && (
                  <div className="button-group">
                    <button onClick={() => startEditing(id, idea)} className="edit-button">Edit</button>
                    <button onClick={() => deleteIdea(id)} className="delete-button">Delete</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ShareYourIdeas;
