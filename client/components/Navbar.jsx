import React, { Component } from 'react';
import styles from '../styles/Navbar.css'
import { useSelector } from 'react-redux'

function Navbar(props) {
  const user = useSelector((state) => state.main.user);

  function createNavItem(user) {
    if (!user.username) {
      return(
        <button className='nav-button' onClick={() => window.location.href='/login'}>Log In / Sign Up</button>
      )
    } else {
      return(
        <p>Welcome back, {user.username}</p>
      )
    }
  }


  return(
    <nav className='mainNav'>
      <ul>
        <li>
          {createNavItem(user)}
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;