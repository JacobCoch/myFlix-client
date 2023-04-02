import { useState, useEffect } from 'react';
import { MovieView } from '../MovieView/movie-view.jsx';
import { MovieCard } from '../MovieCard/movie-card.jsx';

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://mymovieapidb.herokuapp.com/movies'
        );
        const data = await response.json();
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
      } catch (error) {
        console.error('Error fetching data: ', error);
        setError(error);
      }
      return movies;
    };
    fetchData();
  }, []);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
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
    </div>
  );
};
