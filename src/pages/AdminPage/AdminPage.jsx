import "./AdminPage.css"
import React from 'react'
import { useEffect, useState } from "react";
import SidebarAdmin from "../../components/SidebarAdmin/SidebarAdmin"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"


const AdminPage = () => {
    const [page,setPage]=useState([])
  return (
    <div>
      <Header/>
      <SidebarAdmin setPage={setPage}/>
      <Footer/>
    </div>
  )
}

export default AdminPage
