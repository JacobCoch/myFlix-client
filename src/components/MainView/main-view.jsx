import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setMovies } from '../../redux/reducers/movies';
import { setUser } from '../../redux/reducers/user';

import { LoginView } from '../LoginView/login-view.jsx';
import { SignupView } from '../SignupView/signup-view.jsx';
import { NavBar } from '../NavBar/navbar.jsx';
import { MoviesList } from '../MoviesList/movies-list.jsx';
import { ProfileView } from '../ProfileView/profile-view.jsx';
import { MovieView } from '../MovieView/movie-view';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Routes, BrowserRouter, Route, Navigate } from 'react-router-dom';

import './main-view.scss';

export const MainView = () => {
  const movies = useSelector((state) => state.movies.movies);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.token.token);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      return;
    }

    const getUser = () => {
      const username = JSON.parse(localStorage.getItem('user')).Username;
      console.log(username);
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

    getUser();
    getMovies();
  }, [token, dispatch]);

  return (
    <BrowserRouter>
      <NavBar />
      <Container className="movie-cards">
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" replace />
                  ) : (
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  )}
                </>
              }
            />

            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView />
                    </Col>
                  )}
                </>
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
                      <MovieView />
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
              path="/"
              element={
                <>{!user ? <Navigate to="/login" replace /> : <MoviesList />}</>
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
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};
