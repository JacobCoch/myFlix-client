import React, { useState } from 'react';

export const LoginView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  // function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // prevents page from reloading
    console.log(username, password);

    // data to be sent in the request body
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    // fetch request to the API
    fetch('https://mymovieapidb.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Login response: ', data);
        if (data.user) {
          onLoggedIn(data.user, data.token);
        } else {
          alert('No such user');
        }
      })
      .catch((e) => {
        alert('Something went wrong');
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength={5}
          name="username"
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          name="password"
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
