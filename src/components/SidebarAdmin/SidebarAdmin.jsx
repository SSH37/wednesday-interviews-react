import React, { useCallback } from "react";
import { fetchUrl } from "../../library";
import { urlCompanies } from "../../constants/constants";
import { useState, useEffect } from "react";
import "./SidebarAdmin.css"


const SidebarAdmin = ({setPage}) => {
    
  return (
      <div className="sidebarAdmin">
        <h2 onClick={()=>{
            setPage('companies');
        }}>Companies</h2>
        <h2 onClick={()=>{
            setPage('candidates');
            console.log(setPage)
        }}>Candidates</h2>
      </div>
    
  )
}

export default SidebarAdmin
