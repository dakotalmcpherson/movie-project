import { createAction } from '@reduxjs/toolkit';
import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import MovieCard from '../MovieCard.jsx'
import MovieContainer from '../MovieContainer.jsx'
import SearchBar from '../SearchBar.jsx'

import styles from '../../styles/View.css'

const updateSearch = createAction('main/updateSearch')
const updateRandom = createAction('main/updateRandom')


// function for creating fetch url from searchText in state


function MyListView(props) {
  const view = useSelector((state) => state.main.view);
  const random = useSelector((state) => state.main.random);
  const dispatch = useDispatch();

  function handleClick(setting) {
    if (setting == 'random') {
      dispatch(updateRandom([props.list[Math.floor(Math.random() * props.list.length)]]))
    } else {
      dispatch(updateRandom(''))
    }
  }

  function chooseRender(random) {
    if (random) {
      return(
        <div className='view'>
        <h1>My List</h1>
        <button onClick={(e) => handleClick('reset')}>Reset</button>
          <MovieContainer list={random} view={view}/>
      </div>
      )
    } else {
      return(
        <div className='view'>
        <h1>My List</h1>
        <button onClick={(e) => handleClick('random')}>Random Select</button>
          <MovieContainer list={props.list} view={view}/>
      </div>
      )
    }
  }

  return(
   chooseRender(random)
  )
}

export default MyListView;