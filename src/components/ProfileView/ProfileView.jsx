import React from 'react';

import { useSelector } from 'react-redux';

import DeleteUser from './DeleteUser';
import FavoriteMovies from './FavoriteMovie';
import UpdateUser from './UpdateUser';
import UserInfo from './UserInfo';

function ProfileView() {
  const movies = useSelector((state) => state.movies.movies);

  return (
    <>
      <UserInfo />
      <UpdateUser />
      <DeleteUser />
      <FavoriteMovies movies={movies} />
    </>
  );
}

export default ProfileView;
