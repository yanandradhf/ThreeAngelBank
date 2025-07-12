import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login, loading, error } = useAuth();

  const handleLogin = async () => {
    const user = await login(form);
    if (user) {
      alert("Login success");
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <input
        name="email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        name="password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handleLogin} disabled={loading}>
        Login
      </button>
      {error && <p>{error.message}</p>}
    </div>
  );
}
