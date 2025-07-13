import axios from "axios";

const API_URL = "http://localhost:5001";

export function useAuth() {
  // ✅ REGISTER USER
  const register = async (formData) => {
    try {
      const users = await axios.get(`${API_URL}/users`);
      const maxId = users.data.reduce((max, u) => Math.max(max, u.id), 0);

      const newUser = {
        ...formData,
        id: maxId + 1,
        user_role: "user",
        user_created_at: new Date().toISOString(),
        user_update_at: new Date().toISOString(),
      };

      const res = await axios.post(`${API_URL}/users`, newUser);
      return res.data;
    } catch (err) {
      console.error("Register error:", err);
      throw new Error("Gagal mendaftar, coba lagi nanti.");
    }
  };

  // ✅ LOGIN USER
  const login = async ({ user_email, user_password }) => {
    try {
      // Validasi input kosong
      if (!user_email || !user_password) {
        throw new Error("Email dan password wajib diisi.");
      }

      // Validasi format email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(user_email)) {
        throw new Error("Format email tidak valid.");
      }

      // Validasi panjang password
      if (user_password.length < 8) {
        throw new Error("Password minimal 8 karakter.");
      }

      // Fetch semua user
      const res = await axios.get(`${API_URL}/users`);
      const users = res.data;

      // Cari user yang cocok
      const foundUser = users.find(
        (u) => u.user_email === user_email && u.user_password === user_password
      );

      if (!foundUser) {
        throw new Error("Email atau password salah.");
      }

      // Kalau ketemu return user-nya
      return foundUser;
    } catch (err) {
      console.error("Login error:", err);
      // Kalau dia error custom dari validasi di atas, tampilkan message-nya
      throw err;
    }
  };

  // ✅ LOGOUT USER
  const logout = () => {
    localStorage.removeItem("user");
  };

  return { register, login, logout };
}
