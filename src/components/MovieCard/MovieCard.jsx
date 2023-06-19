import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Button, Card, Col, Row } from 'react-bootstrap';
import { FavoriteIcon } from '../FavoriteIcon/FavoriteIcon';

export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100" id="card-container">
      <Row className="h-50">
        <Col className="h-100 text-center mt-3">
          <Card.Img
            variant="top"
            src={movie.ImagePath}
            className="img-fluid h-100 w-auto movie-card-img"
          />
        </Col>
      </Row>

      <Card.Body className="d-flex flex-column" id="card-text">
        <Card.Title className="mt-2">{movie.Title}</Card.Title>
        <Card.Text className="mt-3">{movie.Description}</Card.Text>
        <Row className="d-flex flex-row justify-content-between align-items-baseline mt-auto">
          <Col className="text-start">
            <FavoriteIcon movie={movie} />
          </Col>
          <Col className="text-end">
            <Link to={`/movies/${movie.Title}`}>
              {' '}
              <Button
                className="mt-auto"
                id="card-button"
                variant="secondary"
                size="sm">
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
    _id: PropTypes.string,
    Title: PropTypes.string,
    Description: PropTypes.string,
    ImagePath: PropTypes.string,
    Actors: PropTypes.array,
  }).isRequired,
};
