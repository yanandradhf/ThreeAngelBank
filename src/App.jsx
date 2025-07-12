import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/Register";
import { Routes, Route } from "react-router-dom";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import { UserNewAccountMenu } from "./pages/Dashboard/UserPage/UserNewAccountMenu";
import { UserTransferMenu } from "./pages/Dashboard/UserPage/UserTransferMenu";
import { UserDashboardMenu } from "./pages/Dashboard/UserPage/UserDashboardMenu";
import { UserAnalyticsMenu } from "./pages/Dashboard/UserPage/UserAnalyticsMenu";
//import './App.css'

function App() {
  const [count, setCount] = useState(0);

  return (
      
      <>
      {/* <DashboardPage /> */}
      <Routes>
      <Route path="/user/dashboard" element={<DashboardPage />}>
        <Route index element={<UserDashboardMenu />} />
        <Route path="newaccount" element={<UserNewAccountMenu />} />
        <Route path="transfer" element={<UserTransferMenu />} />
        <Route path="analytics" element={<UserAnalyticsMenu />} />
      </Route>
      </Routes>
      </>
  );
}

export default App;
