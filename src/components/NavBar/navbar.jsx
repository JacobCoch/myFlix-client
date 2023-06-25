import { Col, Row, Container, Nav, Navbar } from 'react-bootstrap';
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
      className='navbar-container'>
      <Container className='navbar-content'>
        <Navbar.Brand as={Link} to='/'>
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='login-links'>
            {user && (
              <>
                <Nav className='navbar-links'>
                  <Nav.Link as={Link} to='/'>
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to='/profile'>
                    Profile
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link onClick={onLoggedOut} className='logout-link'>
                    Logout
                  </Nav.Link>
                  <MoviesFilter />
                </Nav>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
