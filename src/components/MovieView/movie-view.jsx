import PropTypes from 'prop-types';

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export const MovieView = ({ movies }) => {
  const { movieId } = useParams(); // useParams is a hook that allows us to access the URL parameters
  const movie = movies.find((movie) => movie._id === movieId);

  return (
    <div>
      <div>
        <img className="w-100" src={movie.ImagePath} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span> Rating: </span>
        <span>{movie.Rating}</span>
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
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
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
