import React from 'react';

import { Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import devIcon from '../../assets/developer_icon.gif';
import { setToken } from '../../redux/reducers/token';
import { setUser } from '../../redux/reducers/user';
import MoviesFilter from '../MoviesFilter/MoviesFilter';

function NavBar() {
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
      fixed='top'
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
                <Nav className='navbar-search-container'>
                  <Nav.Link onClick={onLoggedOut} className='logout-link'>
                    Logout
                  </Nav.Link>
                  <MoviesFilter />
                </Nav>
                <div className='developer'>
                  <a
                    href='www.jacobcoch.com'
                    className='developer-link'
                    target='_blank'
                    rel='noreferrer'>
                    <img
                      src={devIcon}
                      alt='developer-icon'
                      className='developer-icon'
                    />
                  </a>
                </div>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
