// Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
//import logo from './logo.jpg';
import logo from './logo-removebg-preview.png';
import './App.css';
import './index.css';

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={logo} alt="logo" style={{ width: 'auto', height: '4.1rem', marginBottom:'1rem' }} />
      <div className='nav-links'>
        <div className='main-links'>
          <NavLink className='nav-link' to='/'>Home</NavLink>
          <NavLink className='nav-link' to='/collaborators'>Collaborators</NavLink>
          <NavLink className='nav-link' to='/share-ideas'>Share your Ideas</NavLink>
        </div>
        <NavLink className='nav-link profile-link' to='/profile-section' id='profile'>Profile</NavLink>
      </div>
    </div>
  );
}

export default Navbar;
