import { Link } from 'react-router-dom';
import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/user';
import { setToken } from '../../redux/reducers/token';

export const FavoriteIcon = ({ movie }) => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.token.token);

  const dispatch = useDispatch();

  const alreadyFavorite = user?.FavoriteMovies?.find(
    (favMovieId) => favMovieId === movie.id
  );

  //! POST says it is adding to the list of favs, but there is an error in the console
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
      iconChange = () =>
        document.querySelector('svg').classList.remove('favorite-movie');
    } else {
      requestOptions.method = 'POST';
      resultAlert = `${movie.Title} is added to the list of favorites`;
      iconChange = () =>
        document.querySelector('svg').classList.add('favorite-movie');
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
      onClick={() => toggleFavorite()}
      className="favorite-icon"
      id="favMovieButton">
      {alreadyFavorite ? <FaHeart className="favorite-movie" /> : <FaHeart />}
    </Link>
  );
};
