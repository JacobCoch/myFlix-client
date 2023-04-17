import PropTypes from 'prop-types';
import { Row, Col, Image, Button } from 'react-bootstrap';
import './movie-view.scss';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Row className="justify-content-md-center">
      <Col className="text-center">
        <Image
          src={movie.ImagePath}
          alt={movie.Title}
          fluid
          className="movie-image"
        />
      </Col>
      <Col xs={20} md={20}>
        <div>
          <span>Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.Description}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.Genre.Name}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.Director.Name}</span>
        </div>
        <Button
          onClick={onBackClick}
          className="back-button"
          style={{
            cursor: 'pointer',
            backgroundColor: 'black',
            color: 'white',
          }}>
          Back
        </Button>
      </Col>
    </Row>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.number.isRequired,
    Description: PropTypes.string.isRequired,
    Rating: PropTypes.number.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
    }).isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string,
    }),
    Actors: PropTypes.arrayOf(PropTypes.string.isRequired),
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
