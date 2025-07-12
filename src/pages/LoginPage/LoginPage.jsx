import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function LoginPage() {
  const [form, setForm] = useState({ user_email: "", user_password: "" });
  const { login, loading, error } = useAuth();

  const handleLogin = async () => {
    const user = await login(form);
    console.log(user, "==> LOGINFORM");

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
      <button onClick={handleLogin} disabled={loading}>
        Login
      </button>
      {error && <p>{error.message}</p>}
    </div>
  );
}
