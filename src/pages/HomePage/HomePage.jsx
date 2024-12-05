import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import Card from "../../components/Card/Card";
import { fetchUrl } from "../../library";
import { urlCandidates } from "../../constants/constants";
import "./HomePage.css";

const HomePage = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchUrl(urlCandidates, (res) => {
      setCandidates(res);
    });
  }, []);

  return (
    <>
      <Header />
      <div id="content">
        <Sidebar />
        <div id="candidatesList">
          {candidates.map((cardData) => {
            return <Card key={cardData.id} data={cardData} />;
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
