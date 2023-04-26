import react from 'react';

import { UserInfo } from './user-info';
import { FavoriteMovies } from './favorite-movies';
import { UpdateUser } from './update-user';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form, Row, Col, Card } from 'react-bootstrap';

import './profile-view.scss';
import { UpdateUser } from './update-user';

export const ProfileView = ({ user, movies }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        `https://myflixdb.herokuapp.com/users/${user}`
      );
      const data = await response.json();
      const filteredUser = data.filter((user) => user._id === user);
      setUser(filteredUser);
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      username,
      password,
      email,
      birthday,
      favoriteMovies,
    };
    const response = await fetch();
  };

  const handleRemove = async (movie) => {
    const response = await fetch(
      `https://myflixdb.herokuapp.com/users/${user}/movies/${movie}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    const filteredMovies = favoriteMovies.filter(
      (movie) => movie._id !== data._id
    );
    setFavoriteMovies(filteredMovies);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = {
      username,
      password,
      email,
      birthday,
      favoriteMovies,
    };
    const response = await fetch(
      `https://myflixdb.herokuapp.com/users/${user}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      }
    );
    const data = await response.json();
    console.log(data);
    localStorage.setItem('user', JSON.stringify(data));
    window.open(`/users/${user}`, '_self');
  };

  return (
    <div>
      <UserInfo name={user.username} email={user.email} />
      <FavoriteMovies favoriteMovieList={favoriteMovies} />
      <UpdateUser handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
    </div>
  );
};
