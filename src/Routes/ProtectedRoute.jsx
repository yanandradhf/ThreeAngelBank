import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute({ allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.user_role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default function UnauthorizedPage() {
  return (
    <div className="h-screen flex items-center justify-center text-red-500 text-xl font-semibold">
      Akses Ditolak! Anda tidak punya izin ke halaman ini.
    </div>
  );
}
