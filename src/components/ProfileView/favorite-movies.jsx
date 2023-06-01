import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { MovieCard } from '../MovieCard/movie-card';
import { useSelector } from 'react-redux';

export const FavoriteMovies = () => {
  const user = useSelector((state) => state.user.user);
  const movies = useSelector((state) => state.movies.movies);

  let favoriteMovies = [];
  if (user && user.FavoriteMovies) {
    favoriteMovies = movies.filter((m) => user.FavoriteMovies.includes(m._id));
  }

  const filter = useSelector((state) => state.movies.filter)
    .trim()
    .toLowerCase();

  const filteredMovies = favoriteMovies.filter((m) =>
    m.Title.toLowerCase().includes(filter)
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
