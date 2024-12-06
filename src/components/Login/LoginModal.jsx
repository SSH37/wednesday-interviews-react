import { useContext, useEffect, useState } from "react";
import { loginCtx } from "../../contexts/contexts";
import { fetchUrl } from "../../library";
import { urlLogin } from "../../constants/constants";
import "./LoginModal.css";

const LoginModal = () => {
  const { setLoginShow } = useContext(loginCtx);
  const [emailForm, setEmailForm] = useState("");
  const [passwordForm, setPasswordForm] = useState("");
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
            <input
              type="text"
              name="userName"
              id="userNameLogin"
              onChange={(e) => {
                setEmailForm(e.target.value);
              }}
            />
          </div>
          <div className="loginInputField">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="passwordLogin"
              onChange={(e) => {
                setPasswordForm(e.target.value);
              }}
            />
          </div>
        </div>
        <button
          className={`loginButton ${submitted ? "clickedLogin" : ""}`}
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setSubmitted(true);
            fetchUrl(
              urlLogin,
              (res) => {
                sessionStorage.setItem("accessToken", res.accessToken	);
              },
              {
                method: "POST",
                body: JSON.stringify({ "email": emailForm, "password": passwordForm }),
                headers: {"Content-Type": "application/json"}
              }
            );
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginModal;
