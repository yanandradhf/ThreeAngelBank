import { NavbarAdmin } from "../../components/DashboardAdmin/NavbarAdmin";
import { SidebarAdmin } from "../../components/DashboardAdmin/SidebarAdmin";
import { Navbar } from "../../components/DashboardUser/Navbar";
import { Sidebar } from "../../components/DashboardUser/Sidebar";
import { UserActivityMenu } from "./UserPage/UserActivityMenu";
import { UserDashboardMenu } from "./UserPage/UserDashboardMenu";
import { UserNewAccountMenu } from "./UserPage/UserNewAccountMenu";
import { UserTransferMenu } from "./UserPage/UserTransferMenu";
import { Outlet } from "react-router-dom";

export function DashboardPage() {
    


    
    return (
        // User dashboard
        // <div className="min-h-[100vh] width-[100vhw] bg-gradient-to-br from-emerald-50 to-emerald-100 flex flex-col">
        // {/* NAVBAR */}
        // <Navbar />
        // {/* SIDEBAR */}
        // <Sidebar />
        // {/* MAIN CONTENT */}
        // <Outlet />
        // </div>

        // Admin dashboard
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