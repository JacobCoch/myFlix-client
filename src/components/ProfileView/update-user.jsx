import React from 'react';
import { useState } from 'react';

export const UpdateUser = ({ handleSubmit, handleUpdate }) => {
  const [user, setUser] = useState({});

  return (
    <form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
      <h2>Update Profile</h2>
      <label>Username:</label>
      <input
        type="text"
        name="username"
        defaultValue={user.username}
        onChange={(e) => handleUpdate(e)}
      />
      <label>Password:</label>
      <input
        type="password"
        name="password"
        defaultValue={user.password}
        onChange={(e) => handleUpdate(e)}
      />
      <label>Email:</label>
      <input
        type="email"
        name="email"
        defaultValue={user.email}
        onChange={(e) => handleUpdate(e.target.value)}
      />
      <button variant="primary" type="submit">
        Update
      </button>
    </form>
  );
};
