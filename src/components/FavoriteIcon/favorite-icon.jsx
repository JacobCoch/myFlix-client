import { Link } from 'react-router-dom';
import React, { useState } from 'react'; // Import useState
import { FaHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/user';
import { setToken } from '../../redux/reducers/token';

export const FavoriteIcon = ({ movie }) => {
  const user = useSelector((state) => state.user.user);
  const token = localStorage.getItem('token');

  const dispatch = useDispatch();

  const alreadyFavorite = user?.FavoriteMovies?.includes(movie._id);

  const [iconClassName, setIconClassName] = useState('favorite-icon'); // Declare iconClassName with useState

  const toggleFavorite = () => {
    if (!token) return;

    const url = `https://mymovieapidb.herokuapp.com/users/${user.Username}/${movie.Title}`;

    let requestOptions = {
      method: '',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let resultAlert = '';

    if (alreadyFavorite) {
      requestOptions.method = 'DELETE';
      resultAlert = `${movie.Title} is deleted from the list of favorites`;
      setIconClassName('favorite-icon'); // Update iconClassName using setIconClassName
    } else {
      requestOptions.method = 'POST';
      resultAlert = `${movie.Title} is added to the list of favorites`;
      setIconClassName('favorite-icon favorite-movie'); // Update iconClassName using setIconClassName
    }

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        alert(`${resultAlert}`);

        dispatch(setUser(data));
        dispatch(setToken(data.token));
      })
      .catch((e) => {
        alert('Something went wrong');
        console.log(e);
      });
  };

  return (
    <Link
      onClick={toggleFavorite}
      className={iconClassName}
      id="favMovieButton">
      <FaHeart />
    </Link>
  );
};
