import React from 'react'
import { fetchUrl } from '../../library'
import { urlCompanies } from '../../constants/constants'
import { useState,useEffect } from 'react'
import "./Sidebar.css"

const Sidebar = () => {
  const [companies, setCompanies]=useState([])

  useEffect(()=>{fetchUrl(urlCompanies,(res)=>{setCompanies(res)})})

  return (<>
    <div className='sidebar'><h2>Sidebar</h2>
    <ul>
    {
      companies.map((el)=>{
        return <li>{el.name}</li>
      })
    }
   
    
    </ul>
    </div>
    
    </>
  )
}

export default Sidebar