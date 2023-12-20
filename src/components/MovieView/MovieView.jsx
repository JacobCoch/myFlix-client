import React from 'react';

import { Button, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';
import MovieCard from '../MovieCard/MovieCard';

function MovieView() {
  const movies = useSelector((state) => state.movies.movies);

  const { movieId } = useParams(); // useParams is a hook that allows us to access the URL parameters

  const movie = movies.find((m) => m.Title === movieId);

  const similarMovies = movies.filter((filteredMovie) => {
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
          <Row
            className='d-flex flex-row-reverse p-3 mt-2'
            id='movie-details-view'>
            <Col md={5} className='text-center text-md-end'>
              <img
                src={movie.ImagePath}
                alt={`Poster for ${movie.Title}`}
                className='img-fluid h-200 w-auto movie-view-img'
              />
              <Col className='d-flex justify-content-center mt-3'>
                <FavoriteIcon movie={movie} />
              </Col>
            </Col>

            <Col md={7} className='d-flex flex-column'>
              <Row className='d-flex flex-row  justify-content-between'>
                <Col md={9} className='d-flex flex-column'>
                  <h3 className='my-0 text-white'>
                    <span>{movie.Title}</span>
                  </h3>
                  <h5 className='mt-1 text-left text-white'>
                    <span>Director: </span>
                    <span>{movie.Director.Name}</span>
                  </h5>
                  <Col
                    md={3}
                    className='align-self-left mt-5 text-bottom text-white'>
                    <div>Genre: </div>
                    <span className='fw-bolder'>{movie.Genre.Name}</span>
                  </Col>
                </Col>
              </Row>
              <Row>
                <Col className='mt-md-2 mb-4 text-white'>
                  <div className=' mb-2'>Description: </div>
                  <span>{movie.Description}</span>
                </Col>
              </Row>
              <Row className='d-flex flex-row mt-auto mb-md-4'>
                <Col className='text-end'>
                  <Link to='/'>
                    <Button variant='secondary' size='lg' id='card-button'>
                      Back
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className='similar-movies-container'>
            <h2>Similar movies</h2>
            <hr />

            {similarMovies.map((movie) => (
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
    </>
  );
}

export default MovieView;
