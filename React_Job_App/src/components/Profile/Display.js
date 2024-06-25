import React, { useState } from 'react';
import ProfileDisplay from './profileDisplay.js';
import ProfileForm from './profileform.js';
import { loginUser } from '../../Api/usersApi.js';

function Display() {
  const [profileCreated, setProfileCreated] = useState(false);
  const [userEmail, setUserEmail] = useState(''); // State to hold logged-in user's email

  const handleProfileCreate = async (email) => {
    try {
      const user = await loginUser(email); // Assuming loginUser fetches user data by email
      setUserEmail(user.email); // Set logged-in user's email
      setProfileCreated(true);
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle login error
    }
  };

  const handleEdit = () => {
    setProfileCreated(false); // Switch back to ProfileForm
  };
  const handleCancel = () => {
    setProfileCreated(false); // Switch back to ProfileDisplay without saving changes
  };

  return (
    <div>
      {profileCreated ? (
        <ProfileDisplay userEmail={userEmail} onEdit={handleEdit} />
      ) : (
        <ProfileForm userEmail={userEmail}onCreate={() => handleProfileCreate(userEmail)} onCancel={handleCancel} />
      )}
    </div>
  );
}

export default Display;