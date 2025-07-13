import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DetailUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    setUser(localUser);
  }, []);

  if (!user) {
    return <p className="text-gray-600">Loading user data...</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto bg-white bg-opacity-70 backdrop-blur-md rounded-2xl shadow-lg p-8"
    >
      <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
        🙍‍♂️ User Profile
      </h2>

      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full bg-indigo-400 flex items-center justify-center text-4xl text-white font-bold mb-4">
          {user.user_firstname.charAt(0)}
        </div>
        <h3 className="text-2xl font-semibold text-gray-800">
          {user.user_firstname} {user.user_lastname}
        </h3>
        <p className="text-sm text-gray-600">{user.user_email}</p>
      </div>

      <div className="space-y-4 text-gray-700">
        <div className="flex justify-between">
          <span>Role:</span>
          <span className="font-medium">{user.user_role}</span>
        </div>
        <div className="flex justify-between">
          <span>Gender:</span>
          <span>{user.user_gender}</span>
        </div>
        <div className="flex justify-between">
          <span>Birth Date:</span>
          <span>{user.user_birth}</span>
        </div>
        <div className="flex justify-between">
          <span>Phone:</span>
          <span>{user.user_phone}</span>
        </div>
        <div className="flex justify-between">
          <span>City:</span>
          <span>{user.user_city}</span>
        </div>
        <div className="flex justify-between">
          <span>Created At:</span>
          <span>{new Date(user.user_created_at).toLocaleString()}</span>
        </div>
      </div>
    </motion.div>
  );
}
