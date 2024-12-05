import { useContext } from "react";
import { loginCtx } from "../../contexts/contexts";
import "./LoginModal.css";

const LoginModal = () => {
  const { setLoginShow } = useContext(loginCtx);
  return (
    <div
      className="loginModal"
      onClick={() => {
        setLoginShow(false);
      }}
    >
      <div className="loginContent">{}</div>
    </div>
  );
};

export default LoginModal;
