import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/Register";
import { Routes, Route } from "react-router-dom";

import { DashboardPage } from "./pages/Dashboard/DashboardPage";

// User pages
import { UserNewAccountMenu } from "./pages/Dashboard/UserPage/UserNewAccountMenu";
import { UserTransferMenu } from "./pages/Dashboard/UserPage/UserTransferMenu";
import { UserDashboardMenu } from "./pages/Dashboard/UserPage/UserDashboardMenu";
import { UserAnalyticsMenu } from "./pages/Dashboard/UserPage/UserAnalyticsMenu";
import { UserDetailMenu } from "./pages/Dashboard/UserPage/UserDetailMenu";

// admin pages
import { AdminDashboardMenu } from "./pages/Dashboard/AdminPage/AdminDashboardMenu";
import { AdminNasabahMenu } from "./pages/Dashboard/AdminPage/AdminNasabahMenu";
import { AdminDetailMenu } from "./pages/Dashboard/AdminPage/AdminDetailMenu";
//import './App.css'

function App() {
  const [count, setCount] = useState(0);

  return (
      
      <>
      {/* <DashboardPage /> */}
      <Routes>
        {/* User pages */}
        <Route path="/user/dashboard" element={<DashboardPage />}>
          <Route index element={<UserDashboardMenu />} />
          <Route path="newaccount" element={<UserNewAccountMenu />} />
          <Route path="transfer" element={<UserTransferMenu />} />
          <Route path="analytics" element={<UserAnalyticsMenu />} />
          <Route path="detail" element={<UserDetailMenu />} />
        </Route>

        {/* Admin pages */}
        <Route path="/admin/dashboard" element={<DashboardPage />}>
          <Route index element={<AdminDashboardMenu />} />
          <Route path="nasabah" element={<AdminNasabahMenu />} />
          <Route path="detail" element={<AdminDetailMenu />} />
        </Route>
      </Routes>
      </>
  );
}

export default App;
