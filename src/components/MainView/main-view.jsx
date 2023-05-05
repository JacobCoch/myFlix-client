import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setMovies } from '../../redux/reducers/movies';
import { setUser } from '../../redux/reducers/user';
import { setView } from '../../redux/reducers/view';

import { LoginView } from '../LoginView/login-view.jsx';
import { SignupView } from '../SignupView/signup-view.jsx';
import { NavBar } from '../NavBar/navbar.jsx';

import { MovieView } from '../MovieView/movie-view.jsx';
import { MoviesList } from '../MoviesList/movies-list.jsx';

import { ProfileView } from '../ProfileView/profile-view.jsx';

import { Container, Row, Col } from 'react-bootstrap';
import { Routes, BrowserRouter, Route, Navigate } from 'react-router-dom';

import './main-view.scss';

export const MainView = () => {
  const movies = useSelector((state) => state.movies.movies);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.token.token);
  const view = useSelector((state) => state.view.view);

  const dispatch = useDispatch();

  const handleViewChange = () => {
    const newView = view === 'login' ? 'signup' : 'login';
    dispatch(setView(newView));
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    const getUser = () => {
      const username = JSON.parse(localStorage.getItem('user')).Username;
      fetch(`https://mymovieapidb.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((user) => {
          dispatch(setUser(user));
        })
        .catch((error) => {
          console.error('Error fetching user data: ', error);
        });
    };

    const getMovies = () => {
      fetch('https://mymovieapidb.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => {
          const moviesFromApi = data.map((doc) => {
            return {
              _id: doc._id,
              Title: doc.Title,
              Year: doc.Year,
              Description: doc.Description,
              Rating: doc.Rating,
              Director: {
                Name: doc.Director.Name,
                Bio: doc.Director.Bio,
              },
              Genre: {
                Name: doc.Genre.Name,
                Description: doc.Genre.Description,
              },
              Actors: doc.Actors,
              ImagePath: doc.ImagePath,
              Featured: doc.Featured,
            };
          });
          dispatch(setMovies(moviesFromApi));
        })
        .catch((error) => {
          console.error('Error fetching movie data: ', error);
        });
    };

    const getView = () => {
      const currentView = localStorage.getItem('view');
      dispatch(setView(currentView));
    };

    getUser();
    getMovies();
    getView();
  }, [token, dispatch]);

  return (
    <BrowserRouter>
      <NavBar />
      <Container>
        <Routes>
          <Route
            path="/login"
            element={
              <Row className="main-view justify-content-md-center">
                {view === 'login' ? (
                  <Col md={8} className="auth-container">
                    <div className="auth-left">
                      <h2>Welcome Back!</h2>
                      <p>Please log in the continue.</p>
                    </div>
                    <div className="auth-right">
                      <LoginView />
                    </div>
                    <button onClick={handleViewChange}>Sign Up</button>
                  </Col>
                ) : (
                  <Col md={8} className="auth-container signup-active">
                    <div className="auth-left">
                      <h2>Create an account</h2>
                      <p>Sign up now to get started.</p>
                    </div>
                    <div className="auth-right">
                      <SignupView />
                    </div>
                    <button onClick={handleViewChange}>Log In</button>
                  </Col>
                )}
              </Row>
            }
          />

          <Route
            path="/signup"
            element={
              <Row className="main-view justify-content-md-center">
                {view === 'login' ? (
                  <Col md={8} className="auth-container">
                    <div className="auth-left">
                      <h2>Welcome Back!</h2>
                      <p>Please log in the continue.</p>
                    </div>
                    <div className="auth-right">
                      <LoginView />
                    </div>
                    <button onClick={handleViewChange}>Sign Up</button>
                  </Col>
                ) : (
                  <Col md={8} className="auth-container signup-active">
                    <div className="auth-left">
                      <h2>Create an account</h2>
                      <p>Sign up now to get started.</p>
                    </div>
                    <div className="auth-right">
                      <SignupView />
                    </div>
                    <button onClick={handleViewChange}>Log In</button>
                  </Col>
                )}
              </Row>
            }
          />

          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace /> // replace the current entry in the history stack instead of adding a new one
                ) : (
                  <Col>
                    <MoviesList />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/users/:username"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty</Col>
                ) : (
                  <Col>
                    <ProfileView />
                  </Col>
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
                ) : movies.length === 0 ? (
                  <Col>The list is empty</Col>
                ) : (
                  <Col>
                    <ProfileView />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>{!user ? <Navigate to="/login" replace /> : <MoviesList />}</>
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};
