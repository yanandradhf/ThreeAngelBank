import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/Register";
import { Routes, Route } from "react-router-dom";

import MainDashboardUser from "./pages/Dashboard/MainDashboardUser";
import UserDashboardComponent from "./components/UserDashboard/UserDashboardComponents";
import UserTransactions from "./components/UserDashboard/TransactionComponent";
import CreateTransaction from "./components/UserDashboard/ActionTransaction";

//import './App.css'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Dashboard Layout */}
        <Route path="/dashboard" element={<MainDashboardUser />}>
          <Route index element={<UserDashboardComponent />} />
          <Route path="transactions" element={<UserTransactions />} />
          <Route path="actionTransaction" element={<CreateTransaction />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
