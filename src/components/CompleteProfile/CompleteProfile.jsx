import React, { useState } from 'react';
import CompleteProfileNav from './CompleteProfileNav';
import { FaGithub } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { auth } from "../../firebase";
import './Complete.css';

const CompleteProfile = () => {
  const [fullName, setFullName] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (auth.currentUser) {
        const idToken = await auth.currentUser.getIdToken();

        const response = await fetch(
  `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCv9Gc31utguOMateSGyfk5ac6mpuJYM7E`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idToken: idToken,
      displayName: fullName,
      photoUrl: profilePic,
      returnSecureToken: true
    }),
  }
);

        const data = await response.json();

        if (response.ok) {
          alert("Profile updated successfully 🎉");
          console.log("Updated User:", data);
          await auth.currentUser.reload();
        } else {
          alert(data.error.message || "Failed to update profile ❌");
        }
      } else {
        alert("No user is logged in ❌");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile ❌");
    }
  };

  return (
    <div>
      <CompleteProfileNav />
      <div className="complete-profile-container">
        <h2>Contact Details</h2>
        <form className="complete-profile-form" onSubmit={handleSubmit}>
          <FaGithub />
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="complete-profile-input"
          />

          <TbWorld />
          <input
            type="text"
            placeholder="Profile Picture URL"
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
            className="complete-profile-input"
          />

          <button type="submit" className="complete-profile-btn">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
