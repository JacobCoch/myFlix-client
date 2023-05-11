import React, { useState } from 'react';
import {
  Button,
  Form,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from 'react-bootstrap';
import './login-view.scss';

import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/user';
import { setToken } from '../../redux/reducers/token';

export const LoginView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send a request to the server for authentication
    const data = {
      Username: username,
      Password: password,
    };

    fetch('https://mymovieapidb.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          dispatch(setUser(data.user));
          dispatch(setToken(data.token));
        } else {
          alert('Username or password is incorrect');
        }
      })

      .catch((e) => {
        alert('Something went wrong');
        console.error('Login error: ', e);
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card className="border-0">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formUsername" className="mt-2">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      minLength="3"
                      pattern="^[A-Za-z0-9 .,'\-!?%&]+$"
                      title="Username should contain more than 3 characters, may only contain letters, numbers and special characters: .,'-!?%&"
                      placeholder="Enter your name"
                    />
                  </Form.Group>
                  <Form.Group controlId="formPassword" className="mt-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      pattern="^[A-Za-z0-9 .,'\-!?%&]+$"
                      title="Password may only contain letters, numbers and special characters: .,'-!?%&"
                      placeholder="Enter your password"
                    />
                  </Form.Group>
                  <Row>
                    <Col className="text-end">
                      <Button variant="primary" type="submit" className="mt-3">
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
};
