import { createSlice } from '@reduxjs/toolkit';
// this is the movies reducer
const moviesSlice = createSlice({
  name: 'movies',
  initialState: { movies: [], filter: '' }, // this is the initial state
  reducers: {
    // these are the actions
    setMovies: (state, action) => {
      // this is the action creator
      state.movies = action.payload; // this is the action
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setMovies, setFilter } = moviesSlice.actions;
export default moviesSlice.reducer;
