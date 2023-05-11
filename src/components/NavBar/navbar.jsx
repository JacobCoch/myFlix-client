import { Navbar, Container, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUser } from '../../redux/reducers/user';
import { setToken } from '../../redux/reducers/token';

import { MoviesFilter } from '../MoviesFilter/movies-filter';

export const NavBar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const onLoggedOut = () => {
    dispatch(setUser(null));
    dispatch(setToken(null));
    localStorage.clear();
  };

  return (
    <Navbar
      collapseOnSelect
      bg="light"
      expand="md"
      variant="light"
      sticky="top"
      className="mb-4 py-3">
      <Container>
        <Navbar.Brand as={Link} to="/">
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
