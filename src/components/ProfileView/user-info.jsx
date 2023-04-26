import React from 'react';
import { useState } from 'react';

export const UserInfo = ({ email, name }) => {
  const [user, setUser] = useState({});

  return (
    <>
      <p>User: {user.username}</p>
      <p>Email: {user.email}</p>
    </>
  );
};
