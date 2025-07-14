import { Navigate, Outlet } from "react-router-dom";

export default function PublicOnlyRoute() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    return (
      <Navigate
        to={user.user_role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
        replace
      />
    );
  }

  return <Outlet />;
}

export function RedirectBasedOnAuth() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return (
      <Navigate
        to={user.user_role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
        replace
      />
    );
  }
}
