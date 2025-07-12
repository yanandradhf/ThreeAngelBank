import { Navbar } from "../../components/DashboardUser/Navbar";
import { Sidebar } from "../../components/DashboardUser/Sidebar";
import { UserActivityMenu } from "./UserPage/UserActivityMenu";
import { UserDashboardMenu } from "./UserPage/UserDashboardMenu";
import { UserNewAccountMenu } from "./UserPage/UserNewAccountMenu";
import { UserTransferMenu } from "./UserPage/UserTransferMenu";
import { Outlet } from "react-router-dom";

export function DashboardPage() {
    

  return (
    <div>
      {/* NAVBAR */}
      <Navbar />
      {/* SIDEBAR */}
      <Sidebar />
      {/* MAIN CONTENT */}
      <Outlet />
    </div>
  );
}