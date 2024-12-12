import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage/HomePage";
import SinglePage from "./pages/SinglePage/SinglePage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import AdminPage from "./pages/AdminPage/AdminPage";
import { useState } from "react";
import { LoginProvider } from "./contexts/contexts";
import LoginModal from "./components/Login/LoginModal";


function App() {
  const [loginShow, setLoginShow] = useState(false);
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("accessToken"));

  return (
    <LoginProvider value={{ setLoginShow, loggedIn, setLoggedIn }}>
      {loginShow ? <LoginModal /> : ""}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/candidate/:id" element={<SinglePage />} />
        <Route path="/*" element={<Navigate to={"/"} />} />
        <Route path="/admin" element={loggedIn?<AdminPage />:<Navigate to={"/"}/>} />
      </Routes>
    </LoginProvider>
  );
}

export default App;
