import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { MovieCard } from '../MovieCard/MovieCard';

export const FavoriteMovies = () => {
  const user = useSelector((state) => state.user.user);
  const movies = useSelector((state) => state.movies.movies);

  console.log('user', user);
  console.log('movies', movies);

  let favoriteMoviesList = [];

  if (user && user.FavoriteMovies) {
    favoriteMoviesList = movies.filter((m) =>
      user.FavoriteMovies.includes(m._id)
    );
  }

  const filter = useSelector((state) => state.movies.filter)
    .trim()
    .toLowerCase();

  const filteredMovies = favoriteMoviesList.filter((movie) =>
    movie.Title.toLowerCase().includes(filter)
  );

  return (
    <Row>
      {favoriteMoviesList.length === 0 ? (
        <Col>The list of favorite movies is empty</Col>
      ) : (
        <>
          <div className='text-start h2 mb-4'>List of favorite movies</div>

          {filteredMovies.map((movie) => (
            <Col className='mb-5' key={movie._id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};
