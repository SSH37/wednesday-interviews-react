import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./WelcomePage.css";
const WelcomePage = () => {
  return (
    <div>
      <Header />
      <div className="background">
        <h1>Welcome!</h1>
      </div>
      <Footer />
    </div>
  );
};

export default WelcomePage;
