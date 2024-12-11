import React, { useCallback } from "react";
import { fetchUrl } from "../../library";
import { urlCompanies } from "../../constants/constants";
import { useState, useEffect } from "react";
import "./Sidebar.css";

const Sidebar = ({ setCandidateIds }) => {
  const [companies, setCompanies] = useState([]);
  // const [candidateIDs, setCandidateIDs] = useState([]);

  useEffect(() => {
    fetchUrl(urlCompanies + "?_embed=reports", (res) => {
      setCompanies(res);
    });
  }, []);

  const handleClick = useCallback((el) => {
    let niz = [];
    el.reports.forEach((element) => {
      niz.push(element.candidateId);
    });
    setCandidateIds(niz);
  }, []);

  // console.log(candidateIDs);

  return (
    <>
      <div className="sidebar">
        <h2>Companies</h2>
        <ul>
          {companies.map((el) => {
            return (
              <li
                key={el.id}
                onClick={() => {
                  handleClick(el);
                }}
              >
                {el.name}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
