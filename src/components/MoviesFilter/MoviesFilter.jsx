import React from 'react';

import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';

import { setFilter } from '../../redux/reducers/movies';

function MoviesFilter() {
  const filter = useSelector((state) => state.movies.filter);
  const dispatch = useDispatch();

  return (
    <Form.Control
      type='text'
      placeholder='Search...'
      value={filter}
      onChange={(e) => dispatch(setFilter(e.target.value))}
    />
  );
}

export default MoviesFilter;
