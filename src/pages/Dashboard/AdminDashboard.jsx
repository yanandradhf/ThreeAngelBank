import { Navbar } from "../../components/DashboardAdmin/Navbar";
import { Sidebar } from "../../components/DashboardAdmin/Sidebar";

import { Outlet } from "react-router-dom";

export function AdminDashboard() {
  return (
    <div className="min-h-[100vh] width-[100vhw] bg-gradient-to-br from-emerald-50 to-emerald-100 flex flex-col">
      {/* NAVBAR */}
      <Navbar />
      {/* SIDEBAR */}
      <Sidebar />
      {/* MAIN CONTENT */}
      <Outlet />
    </div>
  );
}
