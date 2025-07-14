import { Outlet } from "react-router-dom";
import { NavbarAdmin } from "../../components/DashboardAdmin/NavbarAdmin";
import { SidebarAdmin } from "../../components/DashboardAdmin/SidebarAdmin";

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex flex-col">
      {/* NAVBAR */}
      <NavbarAdmin />
      <div className="flex flex-1">
        {/* SIDEBAR */}
        <SidebarAdmin />
        {/* MAIN CONTENT */}
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
