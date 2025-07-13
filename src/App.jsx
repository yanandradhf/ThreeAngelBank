import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import LoginPage from "./pages/LoginPage/LoginPage"
// import RegisterPage from "./pages/RegisterPage2/Register";
import { Routes, Route } from "react-router-dom";
//import './App.css'
import Login from "./pages/Login"
import Register from "./pages/RegisterPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
