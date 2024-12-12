import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage/HomePage";
import SinglePage from "./pages/SinglePage/SinglePage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import AdminPage from "./pages/AdminPage/AdminPage";
import { useState } from "react";
import { LoginProvider } from "./contexts/contexts";
import LoginModal from "./components/Login/LoginModal";
import AddCandidatePage from "./pages/AddCandidatePage/AddCandidatePage";


function App() {
  const [loginShow, setLoginShow] = useState(false);
  const [loggedIn] = useState(sessionStorage.getItem("accessToken"));

  return (
    <LoginProvider value={{ setLoginShow, loggedIn }}>
      {loginShow ? <LoginModal /> : ""}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/candidate/:id" element={<SinglePage />} />
        <Route path="/*" element={<Navigate to={"/home"} />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path='/add-candidate' element={<AddCandidatePage />} />
      </Routes>
    </LoginProvider>
  );
}

export default App;
