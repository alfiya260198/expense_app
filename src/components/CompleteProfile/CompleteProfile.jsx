import React, { useState } from 'react';
import CompleteProfileNav from './CompleteProfileNav';
import { FaGithub } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import './Complete.css';

const CompleteProfile = () => {
  const [fullName, setFullName] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile saved:", { fullName, profilePic });
    alert("Profile updated successfully!");
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
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
