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
    <Navbar collapseOnSelect expand='md' variant='light' sticky='top'>
      <Container className='navbar-container'>
        <Navbar.Brand as={Link} to='/'>
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
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
                <Nav className='me-auto'>
                  <Nav.Link as={Link} to='/'>
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to='/profile'>
                    Profile
                  </Nav.Link>
                </Nav>
                <Col md={4} className='search-nav ml-auto'>
                  <Nav.Link onClick={onLoggedOut} className='logout-nav'>
                    Logout
                  </Nav.Link>
                  <MoviesFilter />
                </Col>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
