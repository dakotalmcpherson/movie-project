import { createAction } from '@reduxjs/toolkit';
import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import MovieContainer from '../MovieContainer.jsx'

import styles from '../../styles/View.css'



// function for creating fetch url from searchText in state


function WatchedView (props) {
  const view = useSelector((state) => state.main.view);
  const dispatch = useDispatch();


  return(
    <div className='view'>
      <h1>Watched Movies</h1>
        <MovieContainer list={props.list} view={view}/>
    </div>
  )
}

export default WatchedView;