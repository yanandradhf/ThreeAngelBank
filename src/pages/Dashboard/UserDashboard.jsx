import { useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!localUser) {
      navigate("/login");
    } else {
      setUser(localUser);
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md px-6 py-8">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">
          Three Angels Bank
        </h1>
        <nav className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-left text-gray-700 font-medium hover:text-blue-600 transition"
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => navigate("/dashboard/transactions")}
            className="text-left text-gray-700 font-medium hover:text-blue-600 transition"
          >
            💳 Transactions
          </button>
          <button
            onClick={() => navigate("/dashboard/analytics")}
            className="text-left text-gray-700 font-medium hover:text-blue-600 transition"
          >
            📈 Analytics
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Welcome, <span className="text-blue-600">{user?.user_firstname}</span>{" "}
          👋
        </h2>
        <div className="bg-white rounded-xl shadow p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
