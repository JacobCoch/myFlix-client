import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';

import { FavoriteIcon } from '../FavoriteIcon/favorite-icon';
import { MovieCard } from '../MovieCard/movie-card';

export const MovieView = () => {
  const movies = useSelector((state) => state.movies.movies);

  const { movieId } = useParams(); // useParams is a hook that allows us to access the URL parameters

  const movie = movies.find((m) => m.Title === movieId);

  let similarMovies = movies.filter((filteredMovie) => {
    return (
      filteredMovie.Genre &&
      filteredMovie.Genre.Name === movie?.Genre?.Name && // Access Genre.Name with optional chaining
      filteredMovie.Title !== movie?.Title // Access Title with optional chaining
    );
  });

  return (
    <>
      {movies.length === 0 ? (
        <Col>The list is empty</Col>
      ) : (
        <>
          <Row className="d-flex flex-row-reverse p-3" id="movie-details-view">
            <Col md={5} className="text-center text-md-end">
              <img
                src={movie.ImagePath}
                alt={`Poster for ${movie.Title}`}
                className="img-fluid h-100 w-auto movie-view-img"
              />
            </Col>
            <Col md={7} className="d-flex flex-column">
              <Row className="d-flex flex-row  justify-content-between">
                <Col md={9} className="d-flex flex-column">
                  <h3 className="my-0">
                    <span>Title: </span>
                    <span>{movie.Title}</span>
                  </h3>
                  <h5 className="mt-1 text-left">
                    <span>Director: </span>
                    <span>{movie.Director.Name}</span>
                  </h5>
                </Col>

                <Col md={3} className="align-self-end mb-2 text-end">
                  <span>Genre: </span>
                  <span className="fw-bolder">{movie.Genre.Name}</span>
                </Col>
              </Row>
              <div className="mt-md-5 mb-4">
                <div className=" mb-2">Description:</div>
                <span>{movie.Description}</span>
              </div>
              <Row className="d-flex flex-row justify-content-between mt-auto mb-md-4">
                <Col className="text-start">
                  <FavoriteIcon movie={movie} />
                </Col>
                <Col className="text-end">
                  <Link to={`/`}>
                    <Button variant="secondary" size="lg" id="card-button">
                      Back
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <h2 className="mt-0">Similar movies</h2>
            <hr />
            {similarMovies.map((movie) => (
              <Col
                className="mb-5"
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
    </>
  );
};
