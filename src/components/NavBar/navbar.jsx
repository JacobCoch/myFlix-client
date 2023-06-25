import { Col, Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setToken } from '../../redux/reducers/token';
import { setUser } from '../../redux/reducers/user';

import { MoviesFilter } from '../MoviesFilter/MoviesFilter';

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
      expand='md'
      variant='light'
      sticky='top'
      className='navbar-container d-flex justify-content-center align-items-center'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto navbar-links'>
            {!user && (
              <>
                <Nav.Link as={Link} to='/login'>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to='/signup'>
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav>
                  <Nav.Link as={Link} to='/'>
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to='/profile'>
                    Profile
                  </Nav.Link>
                </Nav>
                <Nav className='logout-search'>
                  <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                </Nav>
                <Row md={4}>
                  <MoviesFilter />
                </Row>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
