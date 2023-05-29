import React from 'react';
import { useSelector } from 'react-redux';

import { UserInfo } from './user-info';
import { FavoriteMovies } from './favorite-movies';
import { UpdateUser } from './update-user';
import { DeleteUser } from './delete-user';

export const ProfileView = () => {
  const movies = useSelector((state) => state.movies.movies);

  return (
    <>
      <UserInfo />
      <UpdateUser />
      <DeleteUser />
      <FavoriteMovies movies={movies} />
    </>
  );
};
