import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import { MainDashboardAdmin } from "./pages/Dashboard/AdminDashboard/MainDashboardAdmin";

import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";

import { UserNewAccountMenu } from "./pages/Dashboard/UserPage/UserNewAccountMenu";
import { UserDashboardMenu } from "./pages/Dashboard/UserPage/UserDashboardMenu";
import { UserTransferMenu } from "./pages/Dashboard/UserPage/UserTransferMenu";
import { UserAnalyticsMenu } from "./pages/Dashboard/UserPage/UserAnalyticsMenu";
import { UserDetailMenu } from "./pages/Dashboard/UserPage/UserDetailMenu";

import { AdminDashboardMenu } from "./pages/Dashboard/AdminPage/AdminDashboardMenu";
import { AdminNasabahMenu } from "./pages/Dashboard/AdminPage/AdminNasabahMenu";
import { AdminDetailMenu } from "./pages/Dashboard/AdminPage/AdminDetailMenu";
import UnauthorizedPage, { ProtectedRoute } from "./Routes/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Unauthorized Page */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Admin Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<MainDashboardAdmin />}>
            <Route index element={<AdminDashboardMenu />} />
            <Route path="nasabah" element={<AdminNasabahMenu />} />
            <Route path="detail" element={<AdminDetailMenu />} />
          </Route>
        </Route>

        {/* User Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/user/dashboard" element={<DashboardPage />}>
            <Route index element={<UserDashboardMenu />} />
            <Route path="newaccount" element={<UserNewAccountMenu />} />
            <Route path="transfer" element={<UserTransferMenu />} />
            <Route path="analytics" element={<UserAnalyticsMenu />} />
            <Route path="detail" element={<UserDetailMenu />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
