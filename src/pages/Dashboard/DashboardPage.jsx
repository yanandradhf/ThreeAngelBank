import { Navbar } from "../../components/DashboardUser/Navbar";
import { Sidebar } from "../../components/DashboardUser/Sidebar";
import { UserDashboardMenu } from "./UserPage/UserDashboardMenu";
import { UserTransferMenu } from "./UserPage/UserTransferMenu";

export function DashboardPage() {
    

  return (
    <div>
        {/* NAVBAR */}
        <Navbar />  

        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        {/* <UserDashboardMenu /> */}

        <UserTransferMenu />
    </div>
  );
}