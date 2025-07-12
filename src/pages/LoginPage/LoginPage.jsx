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
      navigate("/dashboard"); // redirect setelah login sukses
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-500 to-blue-600">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
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

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-sm mt-3 text-center">
            {error.message}
          </p>
        )}

        {/* Register Button */}
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
