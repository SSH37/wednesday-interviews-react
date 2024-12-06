import { useContext, useEffect, useState } from "react";
import { loginCtx } from "../../contexts/contexts";
import "./LoginModal.css";

const LoginModal = () => {
  const { setLoginShow } = useContext(loginCtx);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timerID = setTimeout(() => {
      setSubmitted(false);
    }, 100);
    return () => clearTimeout(timerID);
  }, [submitted]);

  return (
    <div
      className="loginModal"
      onClick={() => {
        setLoginShow(false);
      }}
    >
      <form
        action=""
        className="loginContent"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div>
          <div className="loginInputField">
            <label htmlFor="userName">Username:</label>
            <input type="text" name="userName" id="userNameLogin" />
          </div>
          <div className="loginInputField">
            <label htmlFor="password">Password:</label>
            <input type="text" name="password" id="passwordLogin" />
          </div>
        </div>
        <button
          className={`loginButton ${submitted ? "clickedLogin" : ""}`}
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginModal;
