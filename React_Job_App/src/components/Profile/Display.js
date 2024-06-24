import React, { useState } from 'react';
import ProfileDisplay from './profileDisplay.js';
import ProfileForm from './profileform.js';

function Display() {
  const [profileCreated, setProfileCreated] = useState(false);

  const handleProfileCreate = () => {
    setProfileCreated(true);
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
        <ProfileDisplay onEdit={handleEdit} />
      ) : (
        <ProfileForm onCreate={handleProfileCreate} onCancel={handleCancel} />
      )}
    </div>
  );
}

export default Display;