import React, { useCallback } from "react";
import { urlCompanies } from "../../constants/constants";
import { useState, useEffect } from "react";
import "./Sidebar.css";

const Sidebar = ({ setCandidateIds }) => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${urlCompanies}?_embed=reports`);

        if (response.ok) {
          const result = await response.json();
          setCompanies(result);
        } else {
          throw new Error(response.statusText);
        }
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, []);

  const handleClick = useCallback((el) => {
    let niz = [];
    el.reports.forEach((element) => {
      niz.push(element.candidateId);
    });
    setCandidateIds(niz);
  }, [setCandidateIds]);

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
