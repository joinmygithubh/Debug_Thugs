import React, { useState, useEffect } from "react";
import { db, ref, push, onValue, remove, update } from "../Components/firebaseConfig";

const ProfileManager = () => {
  const [profiles, setProfiles] = useState([]);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    gender: "Male",
    interested: "",
    avatar: "",
  });
  const [editId, setEditId] = useState(null);

  // ✅ Fetch Users from Firebase with Cleanup
  useEffect(() => {
    const usersRef = ref(db, "users");
    const unsubscribe = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        setProfiles(Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data })));
      } else {
        setProfiles([]);
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Add or Update Profile
  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedData = {
      full_name: formData.full_name.trim(),
      email: formData.email.trim(),
      gender: formData.gender,
      interested: formData.interested.trim() || "N/A",
      avatar: formData.avatar || `https://robohash.org/${formData.full_name}.png?size=50x50`,
    };

    if (editId) {
      update(ref(db, `users/${editId}`), trimmedData);
      setEditId(null);
    } else {
      push(ref(db, "users"), trimmedData);
    }

    setFormData({ full_name: "", email: "", gender: "Male", interested: "", avatar: "" });
  };

  // ✅ Delete Profile
  const handleDelete = (id) => {
    remove(ref(db, `users/${id}`));
  };

  // ✅ Edit Profile
  const handleEdit = (profile) => {
    setFormData(profile);
    setEditId(profile.id);
  };

  // ✅ Cancel Edit
  const handleCancelEdit = () => {
    setEditId(null);
    setFormData({ full_name: "", email: "", gender: "Male", interested: "", avatar: "" });
  };

  return (
    <div className="profile-container">
      <h2>Profile Management</h2>

      <form onSubmit={handleSubmit} className="profile-form">
        <input type="text" name="full_name" placeholder="Full Name" value={formData.full_name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="text" name="interested" placeholder="Interest" value={formData.interested} onChange={handleChange} />
        <div className="button-group">
          <button type="submit">{editId ? "Update Profile" : "Add Profile"}</button>
          {editId && <button type="button" className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>}
        </div>
      </form>

      <div className="profile-list">
        {profiles.map((profile) => (
          <div key={profile.id} className={`profile-card ${editId === profile.id ? "editing" : ""}`}>
            <img src={profile.avatar} alt={profile.full_name} className="avatar" />
            <h3>{profile.full_name}</h3>
            <p>Email: {profile.email}</p>
            <p>Gender: {profile.gender}</p>
            <p>Interest: {profile.interested}</p>
            <div className="button-group">
              <button className="edit-btn" onClick={() => handleEdit(profile)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(profile.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileManager;
