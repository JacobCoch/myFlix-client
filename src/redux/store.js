import { configureStore } from '@reduxjs/toolkit';

import moviesReducer from './reducers/movies';
import tokenReducer from './reducers/token';
import userReducer from './reducers/user';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    user: userReducer,
    token: tokenReducer,
  },
});

export default store;
