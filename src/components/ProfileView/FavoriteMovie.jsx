import React from 'react';

import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import MovieCard from '../MovieCard/MovieCard';

function FavoriteMovies() {
  const user = useSelector((state) => state.user.user);
  const movies = useSelector((state) => state.movies.movies);

  const favoriteMoviesList = movies.filter((m) =>
    user?.FavoriteMovies?.includes(m._id)
  );

  const filter = useSelector((state) => state.movies.filter)
    .trim()
    .toLowerCase();

  const filteredMovies = favoriteMoviesList.filter((movie) =>
    movie.Title.toLowerCase().includes(filter)
  );

  return (
    <Row>
      {filteredMovies.length === 0 ? (
        <Col>The list of favorite movies is empty</Col>
      ) : (
        <>
          <Row className='similar-movies-container'>
            <h2>List of favorite movies</h2>
            <hr />

            {filteredMovies.map((movie) => (
              <Col
                className='mb-5'
                key={movie._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Row>
  );
}

export default FavoriteMovies;
