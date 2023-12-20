import React from 'react';

import PropTypes from 'prop-types';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';

function MovieCard({ movie }) {
  return (
    <Card className='h-100' id='card-container'>
      <Link to={`/movies/${movie.Title}`}>
        <Card.Img
          variant='top'
          src={movie.ImagePath}
          className='img-fluid h-100 w-100 movie-card-img'
        />
      </Link>

      <Card.Body className='d-flex flex-column' id='card-text'>
        <Card.Title className='mt-2' id='card-title'>
          {movie.Title}
        </Card.Title>
        <Card.Text className='mt-3'>{movie.Description}</Card.Text>
        <Row className='d-flex flex-row justify-content-between align-items-baseline mt-auto'>
          <Col className='text-start'>
            <FavoriteIcon movie={movie} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string,
    Title: PropTypes.string,
    Description: PropTypes.string,
    ImagePath: PropTypes.string,
    Actors: PropTypes.array,
  }).isRequired,
};

export default MovieCard;
