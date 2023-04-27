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

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null); // if there is a user in local storage, set user to that user, else set user to null
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch('https://mymovieapidb.herokuapp.com/movies', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((movies) => {
        setMovies(movies);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);

  const updateUserInfo = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  return (
    <BrowserRouter>
      <NavBar
        user={user}
        onLoggedOut={() => {
          localStorage.clear();
          setUser(null);
          setToken(null);
        }}
      />

      <Container>
        <Routes>
          <Route
            path="/signup"
            element={
              <>{user ? <Navigate to="/" /> : <SignupView />}</> // if user is logged in, redirect to home page, else show signup
            }
          />

          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }}
                  />
                )}
              </>
            }
          />

          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? ( // if user is not logged in, redirect to login page
                  <Navigate to="/login" />
                ) : movies.length === 0 ? (
                  <Col>Loading ...</Col>
                ) : (
                  <Row className="justify-content-md-center py-5">
                    <Col md={8} className="mb-5">
                      <MovieView
                        movies={movies}
                        user={user}
                        updateUserInfo={updateUserInfo}
                      />
                    </Col>
                  </Row>
                )}
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col>
                    <ProfileView
                      user={user}
                      movies={movies}
                      updateUserInfo={updateUserInfo}
                    />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>Loading ...</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-5" key={movie._id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};
