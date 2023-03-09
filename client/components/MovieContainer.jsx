import React, { Component } from 'react';
import MovieCard from './MovieCard.jsx';
import { useSelector, useDispatch } from 'react-redux'
import styles from '../styles/MovieContainer.css'

function MovieContainer(props) {
  const user = useSelector((state) => state.main.user);

  const movies = props.list.map((movie) => {
    if (movie.poster_path) {
      return <MovieCard view={props.view} title={movie.title} release_date={movie.release_date.slice(0, 4)} imgUrl={movie.poster_path} id={movie.id} />
    }
    if (movie.imgUrl) {
      return <MovieCard view={props.view} title={movie.title} release_date={movie.release_date.slice(0, 4)} imgUrl={movie.imgUrl} id={movie.id} />
    }
    
  })
  return(
    <div className='movie-container'>
      {movies}
    </div>
  )
}

export default MovieContainer;