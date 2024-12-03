import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import Card from "../../components/Card/Card"
import "./HomePage.css"

const HomePage = () => {
  
  //temp
  let data = [1,2,3] 
  return (
    <>
      <Header />
      <div id="content">
        <Sidebar/>
        <div id="candidatesList">
          {data.map((cardData)=>{return <Card data={cardData}/>})}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
