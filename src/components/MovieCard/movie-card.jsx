import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movieData }) => {
  return (
    <Card className="h-100">
      <Row className="h-50">
        <Col className="h-100 text-center mt-3">
          <Card.Img
            variant="top"
            src={movieData.imagePath}
            className="img-fluid h-100 w-auto movie-card-img"
          />
        </Col>
      </Row>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="mt-2">{movieData.Title}</Card.Title>
        <Card.Text className="mt-3">{movieData.Description}</Card.Text>
        <Row className="d-flex flex-row justify-content-between align-items-baseline mt-auto">
          {/* <Col className="text-start">
            <FavoriteIcon movie={movieData} />
          </Col> */}
          <Col className="text-end">
            <Link to={`/movies/${encodeURIComponent(movieData._id)}`}>
              <Button variant="secondary" size="sm" className="mt-auto">
                Details
              </Button>
            </Link>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    ImagePath: PropTypes.string,
    Actors: PropTypes.array,
  }).isRequired,
};
