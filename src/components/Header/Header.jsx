import React from 'react'
import "./Header.css"
import { useState } from 'react'

const Header = () => {
  return (
    <div className='header'>
      <div className='rightSide'><h1>WI</h1></div>
      <div className='leftSide'>
          <button>CANDIDATES</button>
          <button>LOGIN</button>
      </div>
    </div>
  )
}

export default Header
