import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  view: 'search',
  movieList: [],
  searchText: '',
  random: ''
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    searchMovies: (state, action) => {
      state.movieList = action.payload;
      state.searchText = ''
    },
    updateSearch: (state, action) => {
      state.searchText = action.payload;
    },
    updateUser: (state, action) => {
        state.user = action.payload;
    },
    updateView: (state, action) => {
      state.view = action.payload;
    },
    updateRandom: (state, action) => {
      state.random = action.payload;
    }
  }
})

export const { searchMovies, updateSearch } = mainSlice.actions;

export default mainSlice.reducer;