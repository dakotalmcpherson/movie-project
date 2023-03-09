import { createAction } from '@reduxjs/toolkit';
import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import SearchView from './views/SearchView.jsx';
import MyListView from './views/MyListView.jsx';
import WatchedView from './views/WatchedView.jsx';
import BitView from './views/BitView.jsx';
import Navbar from './Navbar.jsx';
import Menu from './Menu.jsx';

const updateUser = createAction('main/updateUser')


const mainStyles = {
  margin: 0,
  maxHeight: '100vh' 
}

const subStyles = {
  display: 'flex',
  flexDirection: 'row',
}


function App(props) {
  console.log('test')
  const searchText = useSelector((state) => state.main.searchText);
  const view = useSelector((state) => state.main.view);
  const movies = useSelector((state) => state.main.movieList);
  const person = useSelector((state) => state.main.user);


  const dispatch = useDispatch();

  function checkUser() {
    fetch('/checklogin')
      .then(response =>  response.json())
      .then((user) => {
        if (user != person) {
          console.log(person)
          console.log(user)
          dispatch(updateUser(user))
        }
      })
  }

  const user = checkUser()

  

  function checkView() {
    if (searchText.toLowerCase() === 'lil bit') {
      return(
        <BitView />
      )
    }

    if (view === 'search') {
      return (
        <SearchView list={movies}/>
      )
    }

    if (view === 'myList') {
      return(
        <MyListView list={person.movieList}/>
      )
    }

    if (view === 'watched') {
      return (
        <WatchedView list={person.watched}/>
      )
    }
  }

  return(
    <div style={mainStyles}>
      <Navbar />
      <div style={subStyles}>
        <Menu />
        {checkView()}
      </div>
    </div>
    
  )
}

export default App;