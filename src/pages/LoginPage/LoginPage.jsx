import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function LoginPage() {
  const [form, setForm] = useState({ user_email: "", user_password: "" });
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const user = await login(form);
    console.log(user, "==> LOGINFORM");

    if (user) {
      alert("Login success");
      localStorage.setItem("user", JSON.stringify(user));
      navigate("../user/dashboard", { replace: true });
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <input
        name="user_email"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, user_email: e.target.value })}
      />
      <input
        name="user_password"
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, user_password: e.target.value })}
      />
      <button type="submit" onClick={handleLogin} disabled={loading}>
        {loading ? "Loading..." : "Login"}
      </button>
      {error && <p>{error.message}</p>}
    </div>
  );
}
