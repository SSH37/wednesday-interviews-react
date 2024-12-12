import React, { useContext } from "react";
import "./Header.css";
import { useNavigate } from "react-router";
import { loginCtx } from "../../contexts/contexts";

const Header = () => {
  const nav = useNavigate();
  const { setLoginShow, loggedIn, setLoggedIn } = useContext(loginCtx);

  return (
    <div className="header">
      <div
        className="leftSide"
        onClick={() => {
          nav("/");
        }}
      >
        <h1>WI</h1>
      </div>
      <div className="rightSide">
        {loggedIn ? <button
          onClick={() => {
            nav("/admin");
          }}
        >
          ADMIN
        </button> : null}
        <button
          onClick={() => {
            if (window.location.pathname === "/home") {
              nav(0);
            } else {
              nav("/home");
            }
          }}
        >
          CANDIDATES
        </button>
        <button
          onClick={() => {
            if (!loggedIn) {
              setLoginShow(true);
            } else {
              sessionStorage.removeItem("accessToken");
              setLoggedIn("");
              nav(0);
            }
          }}
        >
          {loggedIn ? "LOGOFF" : "LOGIN"}
        </button>
      </div>
    </div>
  );
};

export default Header;
