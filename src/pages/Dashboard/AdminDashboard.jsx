

import { Outlet } from "react-router-dom";
import { NavbarAdmin } from "../../components/DashboardAdmin/NavbarAdmin";
import { SidebarAdmin } from "../../components/DashboardAdmin/SidebarAdmin";

export function AdminDashboard() {
  return (
    <div className="min-h-[100vh] width-[100vhw] bg-gradient-to-br from-emerald-50 to-emerald-100 flex flex-col">
      {/* NAVBAR */}
      <NavbarAdmin />
      {/* SIDEBAR */}
      <SidebarAdmin />
      {/* MAIN CONTENT */}
      <Outlet />
    </div>
  );
}
