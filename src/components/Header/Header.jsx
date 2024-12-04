import React from 'react'
import "./Header.css"
// import { useState } from 'react'
import { useNavigate } from 'react-router'

const Header = () => {
  const nav = useNavigate();

  return (
    <div className='header'>
      <div className='rightSide'><h1>WI</h1></div>
      <div className='leftSide'>
          <button
          onClick={()=>{nav("/home")}}
          >CANDIDATES</button>
          <button>LOGIN</button>
      </div>
    </div>
  )
}

export default Header
