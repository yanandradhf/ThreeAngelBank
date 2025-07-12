import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [form, setForm] = useState({ user_email: "", user_password: "" });
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const user = await login(form);
    console.log(user, "==> LOGINFORM");

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-500 to-blue-600 overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute w-72 h-72 bg-white bg-opacity-10 rounded-full -top-10 -left-10 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-white bg-opacity-5 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-slowbounce"></div>
        <div className="absolute w-64 h-64 bg-white bg-opacity-10 rounded-full bottom-0 right-0 animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">
          Login
        </h2>

        <div className="mb-4">
          <input
            name="user_email"
            placeholder="Email"
            className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            onChange={(e) => setForm({ ...form, user_email: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <input
            name="user_password"
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            onChange={(e) =>
              setForm({ ...form, user_password: e.target.value })
            }
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        {error && (
          <p className="text-red-600 text-sm mt-3 text-center">
            {error.message}
          </p>
        )}

        <button
          onClick={() => navigate("/register")}
          className="w-full mt-4 bg-gray-100 text-blue-600 py-3 rounded hover:bg-gray-200 transition border border-gray-300"
        >
          Register
        </button>
      </div>
    </div>
  );
}
