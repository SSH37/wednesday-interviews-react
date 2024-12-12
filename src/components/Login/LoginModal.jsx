import { useContext, useEffect, useState } from "react";
import { loginCtx } from "../../contexts/contexts";
import { urlLogin } from "../../constants/constants";
import "./LoginModal.css";
import { useNavigate } from "react-router";

const LoginModal = () => {
  const { setLoginShow, setLoggedIn } = useContext(loginCtx);
  const [emailForm, setEmailForm] = useState("");
  const [passwordForm, setPasswordForm] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [valError, setValError] = useState();
  const nav = useNavigate();

  useEffect(() => {
    if (submitted) {
      let error = "";
      const emailRegex =
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
      if (!emailRegex.test(emailForm)) {
        error = "Invalid email format.";
      }
      if (passwordForm === "") {
        if (error) {
          error = "Invalid email format and password is empty.";
        } else {
          error = "Password is empty";
        }
      }

      // console.log(error);
      if (!error) {
        (async () => {
          try {
            const response = await fetch(urlLogin, {
              method: "POST",
              body: JSON.stringify({
                email: emailForm,
                password: passwordForm,
              }),
              headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
              const result = await response.json();
              sessionStorage.setItem("accessToken", result.accessToken);
              setLoggedIn(result.accessToken);
              setLoginShow(false);
              nav("/admin");
            } else {
              const result = await response.json();
              throw new Error(result);
            }
          } catch (e) {
            console.log(e.message);
            setValError(e.message);
          }
        })();
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
