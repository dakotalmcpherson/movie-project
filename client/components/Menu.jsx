import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createAction } from '@reduxjs/toolkit';

const styles = {
  backgroundColor: 'green',
  height: '92vh',
  width: '25vw',
  marginLeft: '-0.5em'
}
const updateView = createAction('main/updateView')

function Menu(props) {
  const user = useSelector((state) => state.main.user);
  const dispatch = useDispatch();

  function userButtons(user) {
    if (user.username) {
      return(
        <div>
          <button onClick={() => dispatch(updateView('search'))}>Search</button>
          <button onClick={() => dispatch(updateView('myList'))}>My List</button>
          <button>Watched Movies</button>
        </div>
      )
    } else {
      return(
        <div>
          <button>Search</button>
        </div>
      )
    }
  }

  return(
    <div style={styles}>
      {userButtons(user)}
    </div>
  )
}

export default Menu;