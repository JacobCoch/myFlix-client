import React, { useState } from 'react'; // Import useState

import PropTypes from 'prop-types'; // Import proptypes
import { Button, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { setUser } from '../../redux/reducers/user';

function FavoriteIcon({ movie }) {
  const user = useSelector((state) => state.user.user);
  const token = localStorage.getItem('token');

  const dispatch = useDispatch();

  const alreadyFavorite = user?.FavoriteMovies?.find(
    (favMovieId) => favMovieId === movie._id
  );

  const [favorite, setFavorite] = useState(!!alreadyFavorite);

  const toggleFavorite = () => {
    if (!token) return;

    const url = `https://mymovieapidb.herokuapp.com/users/${user.Username}/${movie._id}`;

    const requestOptions = {
      method: '',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (alreadyFavorite) {
      requestOptions.method = 'DELETE';

      setFavorite(false);
    } else {
      requestOptions.method = 'POST';

      setFavorite(true);
    }

    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setUser(data));
      })
      .catch((e) => {
        alert('Something went wrong');
        console.log(e);
      });
  };
  return (
    <ButtonGroup
      className='d-flex justify-content-center align-items-center'
      style={{ marginLeft: 2, marginRight: 2 }}>
      {favorite ? (
        <Button
          variant='danger'
          size='sm'
          className='remove-button'
          onClick={() => toggleFavorite()}>
          {' '}
          Remove
        </Button>
      ) : (
        <Button
          variant='success'
          size='sm'
          className='add-button'
          onClick={() => toggleFavorite()}>
          {' '}
          Add
        </Button>
      )}
    </ButtonGroup>
  );
}

FavoriteIcon.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default FavoriteIcon;
