import React, { Component } from 'react';
import { createAction } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux'

import styles from '../styles/MovieCard.css'

const updateUser = createAction('main/updateUser')

function MovieCard(props) {

  const user = useSelector((state) => state.main.user);
  const dispatch = useDispatch();

 const { id, imgUrl, release_date, title } = props;

 const movie = {
  id,
  imgUrl,
  release_date,
  title
 }

  function addMovie(movie, event) {
    fetch('/addmovie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movie)
    })
    .then(response => response.json())
    .then(() => {
      event.target.parentElement.parentElement.remove()
    })
  }

  function deleteMovie(movie, event) {
    fetch('/deletemovie', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movie)
    })
  }

  function chooseButtons(view) {
    const noButton = user.movieList.some(mov => mov.id == id)

    if (view == 'search') {
      if (!noButton) {
        return(
          <div>
            <button onClick={(e) => addMovie(movie, e)}>Add Movie</button>
          </div>
      )} else {
        return(
          <div>
            <button disabled={true}>Already Added</button>
          </div>
        )
      }
    }

    if (view == 'myList') {
      return(
        <div>
          <button onClick={(e) => deleteMovie(movie, e)} >Mark as Watched</button>
        </div>
      )
    }

  }

  return(
    <div className='movie-card' id={props.id}> 
      <div className='movie-heading'>
        <h2>{props.title}</h2>
        <p>{props.release_date}</p>
      </div>
       <img src={'https://www.themoviedb.org/t/p/w1280/'+props.imgUrl}></img>
       {chooseButtons(props.view)}
    </div>
  )
}

export default MovieCard;