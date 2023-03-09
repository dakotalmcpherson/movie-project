import React, { Component } from 'react';
import { createAction } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux'

import styles from '../styles/SearchBar.css'

const updateSearch = createAction('main/updateSearch')
const searchMovies = createAction('main/searchMovies')

function createSearchText(text) {
  let starterStr = 'https://api.themoviedb.org/3/search/movie?api_key=a0fae68c21cc3895855290a7ed7ee9f3&query='
  const returnStr = starterStr += text.split(' ').join('+')
  console.log(returnStr)
  return returnStr
}

function SearchBar(props) {

  const searchText = useSelector((state) => state.main.searchText);
  
  const dispatch = useDispatch();

  return(
    <div className='search-bar'>
      <input type="text" value={searchText} onChange={(e) => dispatch(updateSearch(e.target.value))} placeholder='Search for movie by title...'></input>
      <button 
      onClick={() =>  {
        fetch(createSearchText(searchText))
        .then((response) => {
          return response.json()
        })
        .then((response) => {
          dispatch(searchMovies(response.results));
        })
        }}>
        Search</button>
  </div>
  )
  
}

export default SearchBar;