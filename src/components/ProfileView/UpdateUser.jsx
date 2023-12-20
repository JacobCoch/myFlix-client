import React, { useState } from 'react';

import moment from 'moment';
import { Button, Card, CardGroup, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { setUser } from '../../redux/reducers/user';

function UpdateUser() {
  const token = localStorage.getItem('token');
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);

  const updateUser = (username) => {
    fetch(`https://mymovieapidb.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        if (updatedUser) {
          dispatch(setUser(updatedUser));
          localStorage.setItem('user', JSON.stringify(updatedUser));
          console.log(user);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch(`https://mymovieapidb.herokuapp.com/users/${user.Username}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          updateUser(username);
          alert('Your user information has been updated.');
        } else {
          alert('Your user information could not be updated.');
        }
      })
      .catch((error) => {
        `Error: ${error}`;
      });
  };

  return (
    <CardGroup>
      <Card className='border-0'>
        <Card.Body className='user-profile'>
          <div className='text-start h2 mb-0 text-black'>Update user info</div>
          <Form onSubmit={handleSubmit}>
            <Row className='mt-2 d-flex justify-content-between'>
              <Col md={6}>
                <Form.Group controlId='forUsername' className='mt-2'>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength='3'
                    pattern="^[A-Za-z0-9 .,'\-!?%&]+$"
                    title="Username should contain more than 3 characters, may only contain letters, numbers and special characters: .,'-!?%&"
                    placeholder='Enter your name'
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId='forPassword' className='mt-2'>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    pattern="^[A-Za-z0-9 .,'\-!?%&]+$"
                    title="Password may only contain letters, numbers and special characters: .,'-!?%&"
                    placeholder='Create a password'
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className='d-flex justify-content-between'>
              <Col md={6}>
                <Form.Group controlId='forEmail' className='mt-2'>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder='Enter email'
                  />
                  <Form.Text className='text-muted'>
                    We&apos;ll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId='forBirthday' className='mt-2'>
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                    type='date'
                    value={moment(birthday).format('YYYY-MM-DD')}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className='text-end'>
                <Button variant='primary' type='submit' className='mt-3'>
                  Update
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </CardGroup>
  );
}

export default UpdateUser;
