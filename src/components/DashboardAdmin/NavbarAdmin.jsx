import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

export function NavbarAdmin() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserName(`${user.user_firstname} ${user.user_lastname}`);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500 text-white p-4 shadow-lg flex items-center justify-between fixed top-0 left-0 w-full z-50 h-16">
      {/* Logo / App Name */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="text-2xl font-extrabold tracking-wide cursor-pointer"
        onClick={() => navigate("/dashboard")}
      ></motion.div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* User Name */}
        <span className="text-sm font-medium hidden md:block">
          Halo, {userName || "Pengguna"}! (Admin)
        </span>

        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-10 h-10 bg-emerald-300 rounded-full flex items-center justify-center text-xl font-bold border-2 border-white shadow-lg overflow-hidden cursor-pointer"
          onClick={() => navigate("/admin/dashboard/detail")}
          title="Lihat Profil"
        >
          <img
            src="https://www.mauicardiovascularsymposium.com/wp-content/uploads/2019/08/dummy-profile-pic-300x300.png"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </nav>
  );
}
