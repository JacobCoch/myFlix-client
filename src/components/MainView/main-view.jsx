import { useState, useEffect } from 'react';
import { MovieView } from '../MovieView/movie-view.jsx';
import { MovieCard } from '../MovieCard/movie-card.jsx';
import { LoginView } from '../LoginView/login-view.jsx';
import { SignupView } from '../SignupView/signup-view.jsx';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);

  useEffect(() => {
    const fetchData = () => {
      fetch('https://mymovieapidb.herokuapp.com/')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          const moviesFromApi = data.map((movie) => ({
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
            },
            Actors: [],
            ImagePath: movie.ImagePath,
          }));
          setMovies(moviesFromApi);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        });
    };
    fetchData();
  }, []);

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </>
    );
  }

  useEffect(() => {
    if (!token) return;

    fetch('https://mymovieapidb.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
      });
  }, [token]);

  if (selectedMovie) {
    const similarMovies = movies.filter(
      (movie) => movie.Genre.Name === selectedMovie.Genre.Name // only show movies with the same genre as the selected movie
    );
    return (
      <div>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
        <hr />
        <h2>Similar Movies</h2>
        {similarMovies.map(
          (movie) =>
            movie.Title !== selectedMovie.Title && ( // don't show the selected movie in the list of similar movies
              <MovieCard
                key={movie._id}
                movie={movie}
                onMovieClick={(newSelectedMovie) =>
                  setSelectedMovie(newSelectedMovie)
                }
              />
            )
        )}
        <button
          onClick={() => {
            setUser(null);
          }}>
          Logout
        </button>
      </div>
    );
  }

  if (movies.length === 0) {
    return <div> The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}>
        Logout
      </button>
    </div>
  );
};
