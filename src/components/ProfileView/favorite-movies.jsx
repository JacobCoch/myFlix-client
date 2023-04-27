import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { MovieCard } from '../MovieCard/movie-card';

export const FavoriteMovies = ({ updateUserInfo, movies, user }) => {
  const favoriteMovies = movies.filter((movie) =>
    user?.favoriteMovies?.includes(movie._id)
  );

  return (
    <Row className="justify-content-md">
      <h2>Favorite Movies</h2>
      {favoriteMovies.length ? (
        favoriteMovies.map((movie) => (
          <Col className="mb-5" key={movie._id} md={3}>
            <MovieCard
              movie={movie}
              updateUserInfo={updateUserInfo}
              user={user}
            />
          </Col>
        ))
      ) : (
        <p>You have no favorite movies yet!</p>
      )}
    </Row>
  );
};
