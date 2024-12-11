import { useContext, useEffect, useState } from "react";
import { loginCtx } from "../../contexts/contexts";
import { fetchUrl } from "../../library";
import { urlLogin } from "../../constants/constants";
import { useNavigate } from "react-router";
import "./LoginModal.css";

const LoginModal = () => {
  const { setLoginShow } = useContext(loginCtx);
  const [emailForm, setEmailForm] = useState("");
  const [passwordForm, setPasswordForm] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [valError, setValError] = useState();

  const nav = useNavigate();

  useEffect(() => {
    if (submitted) {
      // console.log("here");
      let error = "";
      const emailRegex =
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
      if (!emailRegex.test(emailForm)) {
        error = "Invalid email format.";
      }
      if (passwordForm == "") {
        if (error){
          error = "Invalid email format and password is empty."
        } else {
          error = "Password is empty"
        }
      }

      console.log(error);
      if (!error) {
        fetchUrl(
          urlLogin,
          (res) => {
            sessionStorage.setItem("accessToken", res.accessToken);
          },
          true,
          {
            method: "POST",
            body: JSON.stringify({
              email: emailForm,
              password: passwordForm,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        setLoginShow(false);
        // nav(0);
      } else {
        setValError(error);
      }
    }
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
            className={`${valError ? "error" : ""}}`}
              type="password"
              name="password"
              id="passwordLogin"
              onChange={(e) => {
                setPasswordForm(e.target.value);
              }}
            />
          </div>
        </div>
        {valError ? <span className="error">{valError}</span> : null}
        <button
          // disabled={loginDisabled}
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
