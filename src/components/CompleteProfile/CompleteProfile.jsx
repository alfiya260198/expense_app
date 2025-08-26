import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import CompleteProfileNav from './CompleteProfileNav';
import { FaGithub } from 'react-icons/fa';
import { TbWorld } from 'react-icons/tb';
import './Complete.css';
import VerifyEmailButton from './VerifyEmailButton';

const CompleteProfile = () => {
  const [fullName, setFullName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!auth.currentUser) {
        setLoading(false);
        return;
      }
      try {
        const idToken = await auth.currentUser.getIdToken();
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCv9Gc31utguOMateSGyfk5ac6mpuJYM7E`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken }),
          }
        );
        const data = await response.json();

        console.log('Fetched profile data:', data);

        if (response.ok && data.users && data.users.length > 0) {
          setFullName(data.users[0].displayName || '');
          setProfilePic(data.users[0].photoUrl || '');
        } else {
          alert('Failed to fetch profile data');
        }
      } catch (error) {
        alert('Error fetching profile data');
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      alert('No user logged in');
      return;
    }
    try {
      const idToken = await auth.currentUser.getIdToken();
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCv9Gc31utguOMateSGyfk5ac6mpuJYM7E`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            idToken,
            displayName: fullName,
            photoUrl: profilePic,
            returnSecureToken: true,
          }),
        }
      );
      const data = await response.json();

      console.log('Profile update API response:', data);

      if (response.ok) {
        alert('Profile updated successfully 🎉');
        await auth.currentUser.reload();
        setIsEditing(false);
      } else {
        alert(data.error.message || 'Failed to update profile');
      }
    } catch (error) {
      alert('Error updating profile');
      console.error('Update error:', error);
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div>
      <CompleteProfileNav />
      <div className="complete-profile-container">
        <h2>Contact Details</h2>

        {isEditing ? (
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
              Save Profile
            </button>
            <button
              type="button"
              className="complete-profile-btn"
              onClick={() => setIsEditing(false)}
              style={{ marginLeft: '10px' }}
            >
              Cancel
            </button>
          </form>
        ) : (
          <div className="profile-preview">
            <p>
              <strong>Full Name:</strong> {fullName || '(No name entered)'}
            </p>
            <p>
              <strong>Profile Picture URL:</strong> {profilePic || '(No photo URL entered)'}
            </p>
            <button
              type="button"
              className="complete-profile-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
            <VerifyEmailButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default CompleteProfile;
