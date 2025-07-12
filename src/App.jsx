import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/Register";
import { Routes, Route } from "react-router-dom";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
//import './App.css'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <DashboardPage/>
      
      <Routes>
        <Route path="/user/dashboard" element={<RegisterPage />} />
        <Route path="/user/transfer" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
