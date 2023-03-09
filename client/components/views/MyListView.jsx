import { createAction } from '@reduxjs/toolkit';
import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import MovieCard from '../MovieCard.jsx'
import MovieContainer from '../MovieContainer.jsx'
import SearchBar from '../SearchBar.jsx'

import styles from '../../styles/View.css'

const updateSearch = createAction('main/updateSearch')
const searchMovies = createAction('main/searchMovies')


// function for creating fetch url from searchText in state


function MyListView(props) {
  const searchText = useSelector((state) => state.main.searchText);
  const movies = useSelector((state) => state.main.movieList);
  const view = useSelector((state) => state.main.view);
  const dispatch = useDispatch();

  const movieElements = props.list.map(movie => {
    return(
      <div className='movie-container'>
        <MovieCard title={movie.title} release_date={movie.release_date} imgUrl={movie.poster_path} />
      </div>
    )
  })

  return(
    <div className='view'>
      <h1>My List</h1>
        <SearchBar />
        <MovieContainer list={props.list} view={view}/>
    </div>
  )
}

export default MyListView;