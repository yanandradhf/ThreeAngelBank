import { useState, useEffect } from "react";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export function LoginPage() {
  const [form, setForm] = useState({ user_email: "", user_password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // 👉 Cek user di localStorage, kalau ada langsung redirect ke dashboard sesuai role
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.user_role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    }
  }, [navigate]);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const user = await login(form);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        // Redirect ke dashboard sesuai role
        if (user.user_role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-green-200 via-green-400 to-emerald-500 overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute w-72 h-72 bg-white bg-opacity-10 rounded-full -top-10 -left-10 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-white bg-opacity-5 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-slowbounce"></div>
        <div className="absolute w-64 h-64 bg-white bg-opacity-10 rounded-full bottom-0 right-0 animate-pulse"></div>
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-sm p-8 bg-white bg-opacity-80 backdrop-blur-xl rounded-3xl shadow-2xl"
      >
        <h2 className="text-3xl font-extrabold mb-8 text-center text-emerald-800 tracking-wide">
          Welcome Back 🌿
        </h2>

        <div className="mb-4">
          <input
            name="user_email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-emerald-300"
            onChange={(e) => setForm({ ...form, user_email: e.target.value })}
          />
        </div>

        <div className="mb-4 relative">
          <input
            name="user_password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-emerald-300"
            onChange={(e) =>
              setForm({ ...form, user_password: e.target.value })
            }
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition font-semibold"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        {error && (
          <p className="text-red-600 text-sm mt-3 text-center">{error}</p>
        )}

        <button
          onClick={() => navigate("/register")}
          className="w-full mt-4 bg-green-100 text-emerald-700 py-3 rounded-lg hover:bg-green-200 transition border border-green-300 font-semibold"
        >
          Register
        </button>
      </motion.div>
    </div>
  );
}
