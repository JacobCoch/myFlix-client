import React, { useState, useEffect } from 'react';
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
    if (!token) {
      return;
    }

    // Get User on every reload
    getUser();

    // Get movies
    fetchMovies();
  }, [token]);

  const fetchMovies = () => {
    fetch('https://mymovieapidb.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          _id: movie._id,
          Title: movie.Title,
          Description: movie.Description,
          ImagePath: movie.ImagePath,
        }));
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
          // Manipulating data from the API response and updating movies state
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
              Description: movie.Genre.Description,
            },
            Actors: movie.Actors,
            ImagePath: movie.ImagePath,
            Featured: movie.Featured,
          }));
          setMovies(moviesFromApi);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        });
    };
    fetchData();
  }, [token]);

  // if no user is logged in, show LoginView and/or SignupView
  if (!user) {
    return (
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
    );
  }

  if (selectedMovie) {
    // if a movie is selected, render MovieView with similar movies
    const similarMovies = movies.filter(
      (movie) => movie.Genre.Name === selectedMovie.Genre.Name
    );

    // render MovieView with selected movie and similar movies
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

  // if no movies, show empty message
  if (movies.length === 0) {
    return <div> The list is empty!</div>;
  }

  // if movies are available, render MovieCard for each movie
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
