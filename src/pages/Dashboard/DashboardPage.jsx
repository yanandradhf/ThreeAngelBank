import { Navbar } from "../../components/DashboardUser/Navbar";
import { Sidebar } from "../../components/DashboardUser/Sidebar";
import { UserActivityMenu } from "./UserPage/UserActivityMenu";
import { UserDashboardMenu } from "./UserPage/UserDashboardMenu";
import { UserNewAccountMenu } from "./UserPage/UserNewAccountMenu";
import { UserTransferMenu } from "./UserPage/UserTransferMenu";
import { Outlet } from "react-router-dom";

export function DashboardPage() {
    

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