import React, { Component } from 'react';
import styles from '../../styles/View.css'
import SearchBar from '../SearchBar.jsx'

const url = 'https://i.imgur.com/j8mBWPD.jpg'

function BitView(props) {
  return(
    <div className='view'>
      <SearchBar />
      <img src={url}></img>
    </div>
  )
}

export default BitView;