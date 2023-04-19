import react from 'react';

const ProfileView = ({ user }) => {
  return (
    <div>
      <h1>Profile View</h1>
      <p>Welcome, {user.username}!</p>
      <p>Email: {user.email}</p>
      {/* Add more profile information here */}
    </div>
  );
};
