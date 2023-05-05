import React from 'react';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export const UpdateUser = ({ updateUserInfo, user }) => {
  console.log(user.Username);
  const storedToken = localStorage.getItem('token');
  console.log(user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();

    const userdata = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    try {
      const response = await fetch(
        `https://mymovieapidb.herokuapp.com/users/${user.Username}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userdata),
        }
      );

      const updatedUser = await response.json();

      if (updatedUser) {
        // update user info
        updateUserInfo(updatedUser);
      }

      console.log(updatedUser);
      alert("You've successfully updated your user information.");
    } catch (error) {
      console.log('Error updating user info: ', error);

      alert(error);
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <Form className="profile-form" onSubmit={handleUpdate}>
        <Form.Group controlId="formGroupUsername">
          <Form.Label>Username: </Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formGroupBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>
        <br />

        <Button variant="primary" type="submit">
          Update User Info
        </Button>
      </Form>
    </div>
  );
};
