import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createAction } from '@reduxjs/toolkit';

import styles from '../styles/Menu.css'

const updateView = createAction('main/updateView')

function Menu(props) {
  const user = useSelector((state) => state.main.user);
  const view = useSelector((state) => state.main.view);
  const dispatch = useDispatch();

  function userButtons(user) {
    if (user.username) {
      return(
        <div className='menu-container'>
          <div className='button-container'>
          <img src = 'https://i.imgur.com/d8fdqsk.png'></img>
          <button onClick={() => { dispatch(updateView('search'))}} disabled={view === 'search'}>Search</button>
          <button onClick={() => dispatch(updateView('myList'))} disabled={view === 'myList'}>My List</button>
          <button onClick={() => dispatch(updateView('watched'))} disabled={view === 'watched'}>Watched Movies</button>
          </div>
          <div className='stat-info'>
            <h2>{user.movieList.length} Movies in List</h2>
            <h2>{user.watched.length} Movies Watched</h2>
          </div>
        </div>
      )
    } else {
      return(
        <div className='menu-container'>
          <div className='button-container'>
            <img src = 'https://i.imgur.com/d8fdqsk.png'></img>
            <button disabled={true}>Search</button>
          </div>
        </div>
      )
    }
  }

  return(
    <div className='menu-items'>
      {userButtons(user)}
    </div>
  )
}

export default Menu;