import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MovieCard } from '../MovieCard/movie-card.jsx';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export const MoviesList = () => {
  const movies = useSelector((state) => state.movies.movies);
  const filter = useSelector((state) => state.movies.filter)
    .trim()
    .toLowerCase();

  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(filter)
  );

  return (
    <>
      <Row>
        {movies.length === 0 ? ( // if movies array is empty, display message
          <Col>The list is empty</Col>
        ) : (
          filteredMovies.map(
            (
              movie // else, display movies
            ) => (
              <Col
                className="mb-5"
                key={movie._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}>
                <MovieCard movieData={movie} />
              </Col>
            )
          )
        )}
      </Row>
    </>
  );
};
