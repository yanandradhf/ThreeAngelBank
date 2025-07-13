import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/Register";
import MainDashboardUser from "./pages/Dashboard/MainDashboardUser";
import UserDashboardComponent from "./components/UserDashboard/UserDashboardComponents";
import UserTransactions from "./components/UserDashboard/TransactionComponent";
import CreateTransaction from "./components/UserDashboard/ActionTransaction";
import DetailUser from "./components/UserDashboard/DetailUser"; // 👉 Import komponen detail user

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
          <Route path="profile" element={<DetailUser />} />{" "}
          {/*  Tambah route profile */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
