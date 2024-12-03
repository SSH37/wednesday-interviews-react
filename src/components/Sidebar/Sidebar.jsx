import React from 'react'
import { fetchUrl } from '../../library'
import { urlCompanies } from '../../constants/constants'
import { useState,useEffect } from 'react'

const Sidebar = () => {
  const [companies, setCompanies]=useState([])

  useEffect(()=>{fetchUrl(urlCompanies,(res)=>{setCompanies(res)})})

  return (<>
    <div><h2></h2>
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