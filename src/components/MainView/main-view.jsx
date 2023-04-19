import { useState, useEffect } from 'react';
import { MovieView } from '../MovieView/movie-view.jsx';
import { MovieCard } from '../MovieCard/movie-card.jsx';
import { LoginView } from '../LoginView/login-view.jsx';
import { SignupView } from '../SignupView/signup-view.jsx';
import { NavBar } from '../NavBar/navbar.jsx';
import { ProfileView } from '../ProfileView/profile-view.jsx';

import { Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { Routes, BrowserRouter, Route, Navigate } from 'react-router-dom';

//! WIP, movieview not working, need to fix
//! WIP, cant sign up

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null); // if there is a user in local storage, set user to that user, else set user to null
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const searchString = localStorage.getItem('searchString');

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
        localStorage.setItem('movies', JSON.stringify(movies));
      })
      .catch((err) => {
        console.error('Error fetching movies: ', err);
        console.log(movies);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavBar
        user={user}
        onLoggedOut={() => {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          setUser(null);
          setToken(null);
        }}
      />

      <Container>
        <Routes>
          <Route
            path="/signup"
            element={
              <>{user.Username ? <Navigate to="/" /> : <SignupView />}</> // if user is logged in, redirect to home page, else show signup
            }
          />

          <Route
            path="/login"
            element={<>{user.Username ? <Navigate to="/" /> : <LoginView />}</>} // if user is logged in, redirect to home page, else show login
          />

          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user.Username ? ( // if user is not logged in, redirect to login page
                  <Navigate to="/login" />
                ) : movies.length === 0 ? (
                  <Col>Loading ...</Col>
                ) : (
                  <Row className="justify-content-md-center py-5">
                    <Col md={8} className="mb-5">
                      <MovieView />
                    </Col>
                  </Row>
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user.Username ? (
                  <Navigate to="/login" />
                ) : movies.length === 0 ? (
                  <Col>Loading ...</Col>
                ) : (
                  <Row className="justify-content-md-center py-5">
                    {searchString
                      ? movies
                          .filter((movie) =>
                            movie.Title.toLowerCase().includes(searchString)
                          )
                          .map((movie) => (
                            <MovieCard movie={movie} key={movie._id} />
                          ))
                      : movies.map((movie) => (
                          <MovieCard movie={movie} key={movie._id} />
                        ))}
                  </Row>
                )}
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>{!user.username ? <ProfileView /> : <Navigate to="/login" />}</>
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};
