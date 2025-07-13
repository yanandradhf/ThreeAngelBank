import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarAdmin } from "../../../components/DashboardAdmin/SidebarAdmin";
import { NavbarAdmin } from "../../../components/DashboardAdmin/NavbarAdmin";
import { Outlet } from "react-router-dom";

export function MainDashboardAdmin() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.user_role !== "admin") {
      navigate("/user/dashboard");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SidebarAdmin isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <NavbarAdmin isSidebarOpen={isSidebarOpen} />

        <main className="p-8 overflow-auto pt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
