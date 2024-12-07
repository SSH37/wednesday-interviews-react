import React, { useContext } from 'react'
import "./Header.css"
// import { useState } from 'react'
import { useNavigate } from 'react-router'
import { loginCtx } from '../../contexts/contexts';

const Header = () => {
  const nav = useNavigate();
  const {setLoginShow} = useContext(loginCtx)

  return (
    <div className='header'>
      <div className='rightSide'><h1>WI</h1></div>
      <div className='leftSide'>
          <button
          onClick={()=>{nav("/home")}}
          >CANDIDATES</button>
          <button onClick={()=>{setLoginShow(true)}}>LOGIN</button>
      </div>
    </div>
  )
}

export default Header
