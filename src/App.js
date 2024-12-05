import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage/HomePage";
import SinglePage from "./pages/SinglePage/SinglePage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import { useState } from "react";
import { LoginProvider } from "./contexts/contexts";
import LoginModal from "./components/Login/LoginModal";

function App() {
  const [loginShow, setLoginShow] = useState(false);

  return (
    <LoginProvider value={{ setLoginShow }}>
      {loginShow ? <LoginModal /> : ""}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/candidate/:id" element={<SinglePage />} />
        <Route path="/*" element={<Navigate to={"/home"} />} />
      </Routes>
    </LoginProvider>
  );
}

export default App;
