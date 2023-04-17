import { useState, useEffect } from 'react';
import { MovieView } from '../MovieView/movie-view.jsx';
import { MovieCard } from '../MovieCard/movie-card.jsx';
import { LoginView } from '../LoginView/login-view.jsx';
import { SignupView } from '../SignupView/signup-view.jsx';
import { Row, Col } from 'react-bootstrap';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch('https://mymovieapidb.herokuapp.com/movies', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong');
        }
        return res.json();
      })
      .then((data) => {
        const movies = data.map((movie) => ({
          _id: movie._id,
          Title: movie.Title,
          Year: movie.Year,
          Description: movie.Description,
          Rating: movie.Rating,
          Director: {
            Name: movie.Director.Name,
            Bio: movie.Director.Bio,
          },
          Genre: {
            Name: movie.Genre.Name,
            Description: movie.Genre.Description,
          },
          Actors: movie.Actors,
          ImagePath: movie.ImagePath,
          Featured: movie.Featured,
        }));
        setMovies(movies);
      })
      .catch((err) => {
        console.error('Error fetching movies: ', err);
      });
  }, [token]);

  return (
    <Row className="justify-content-md-center">
      {!user ? ( // If user is not logged in, show login view
        <Col md={5}>
          <LoginView onLoggedIn={(user) => setUser(user)} />
          or
          <SignupView />
        </Col>
      ) : selectedMovie ? ( // If a movie is selected, show the movie view
        <Col md={8}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? ( // If there are no movies, show a message
        <div>The list is empty!</div>
      ) : (
        // Otherwise, show the list of movies
        <>
          {movies.map((movie) => (
            <Col className="mb-4" key={movie.id} md={3}>
              <MovieCard
                movie={movie}
                onMovieClick={(movie) => setSelectedMovie(movie)}
              />
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};
