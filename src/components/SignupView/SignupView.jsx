import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col, CardGroup } from 'react-bootstrap';

export const SignupView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch('https://mymovieapidb.herokuapp.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        alert('User created');
        window.location.reload();
      } else {
        alert('Something went wrong');
      }
    });
  };

  return (
    <Container className='signup-container'>
      <div>
        <h2
          className='welcome-text'
          style={{
            textAlign: 'center',
            marginBottom: '20px',
          }}>
          Welcome to MyFlix
        </h2>
      </div>
      <Row>
        <Col>
          <CardGroup>
            <Card className='border-0'>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId='formUsername'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter username'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      minLength={5}
                      name='username'
                    />
                  </Form.Group>

                  <Form.Group controlId='formPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId='formEmail'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type='email'
                      placeholder='Enter email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId='formBirthday'>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      type='date'
                      placeholder='Enter birthday'
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <div className='redirect-buttons'>
                    <Button
                      variant='primary'
                      type='submit'
                      className='submit-button'>
                      Submit
                    </Button>
                    <Link to={'/login'}>Already a member? Login here.</Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
};
