import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import Card from "../../components/Card/Card";
import { fetchUrl } from "../../library";
import { urlCandidates } from "../../constants/constants";
import { FaSearch } from "react-icons/fa";
import "./HomePage.css";

const HomePage = () => {
  const [candidates, setCandidates] = useState([]);
  const [filterParam, setFilterParam] = useState("");

  useEffect(() => {
    fetchUrl(`${urlCandidates}${filterParam}`, (res) => {
      setCandidates(res);
    });
  }, [filterParam]);

  return (
    <>
      <Header />
      <div id="content">
        <Sidebar />
        <div id="candidatesListParent">
          <div className="candidatesSubHeader">
            <p>Candidates</p>
            <div className="searchBox">
              <FaSearch className="iconHP" />
              <input
                className=""
                type="search"
                name="search"
                id="search"
                onInput={(e) => {
                  setFilterParam(`?name_like=${e.target.value}`);
                }}
              />
              <label htmlFor="search" id="searchLabel">
                Search candidates
              </label>
            </div>
          </div>
          <div id="candidatesList">
            {candidates.map((cardData) => {
              return <Card key={cardData.id} data={cardData} />;
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
