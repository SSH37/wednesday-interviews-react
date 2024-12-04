import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage/HomePage";
import SinglePage from "./pages/SinglePage/SinglePage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/candidate/:id" element={<SinglePage />} />
      <Route path="/*" element={<Navigate to={"/home"} />} />
    </Routes>
  );
}

export default App;
