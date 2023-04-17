import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // prevents page from reloading
    console.log(username, password);

    // data to be sent in the request body
    const data = {
      Username: username,
      Password: password,
    };
    console.log(data);

    // fetch request to the API
    const loginUser = async (data) => {
      try {
        const response = await fetch(
          'https://mymovieapidb.herokuapp.com/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              mode: 'no-cors',
            },
            body: JSON.stringify(data),
          }
        );

        const responseData = await response.json();

        if (responseData.user) {
          localStorage.setItem('user', JSON.stringify(responseData.user));
          localStorage.setItem('token', responseData.token);
          // dispatch(setUser(responseData.user));
          // dispatch(setToken(responseData.token));
        } else {
          alert('No such user');
        }
      } catch (error) {
        alert('Something went wrong');
        console.log(error);
      }
    };
    loginUser();

    return (
      <form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength={5}
            name="username"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            minLength={5}
            name="password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </form>
    );
  };
};
