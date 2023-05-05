import { UserInfo } from './user-info';
import { FavoriteMovies } from './favorite-movies';
import { UpdateUser } from './update-user';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form, Row, Col, Card } from 'react-bootstrap';

import './profile-view.scss';
import { UpdateUser } from './update-user';

export const ProfileView = ({ user, updateUserInfo, movies }) => {
  console.log(user);
  return (
    <div>
      <h1>Profile</h1>
      <UserInfo user={user} />
      <br />
      <FavoriteMovies
        updateUserInfo={updateUserInfo}
        movies={movies}
        user={user}
      />
      <br />
      <UpdateUser updateUserInfo={updateUserInfo} user={user} />
    </div>
  );
};
