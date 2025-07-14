import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const API_URL = "https://687288d776a5723aacd50eeb.mockapi.io/ThreeAngelsBank";

export function useAuth() {
  const getUserById = async (userId) => {
    const res = await axios.get(`${API_URL}/users/${userId}`);
    return res.data;
  };

  const getAllUsers = async () => {
  const res = await axios.get(`${API_URL}/users`);
  return res.data;
  };

  const deleteUser = async (id) => {
      await axios.delete(`${API_URL}/users/${id}`);
    };

  // ✅ REGISTER USER
  const register = async (formData) => {
    try {
      const users = await axios.get(`${API_URL}/users`);
      const maxId = users.data.reduce((max, u) => Math.max(max, u.id), 0);

      const newUser = {
        ...formData,
        id: maxId + 1,
        user_role: "user",
        session_token: "",
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
      // Validasi input
      if (!user_email || !user_password) {
        throw new Error("Email dan password wajib diisi.");
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(user_email)) {
        throw new Error("Format email tidak valid.");
      }
  
      if (user_password.length < 8) {
        throw new Error("Password minimal 8 karakter.");
      }
  
      // Ambil semua user
      const res = await axios.get(`${API_URL}/users`);
      const users = res.data;
  
      // Cari user yang cocok
      const foundUser = users.find(
        (u) =>
          u.user_email === user_email &&
          u.user_password === user_password
      );
  
      if (!foundUser) {
        throw new Error("Email atau password salah.");
      }
  
      // Cek apakah user sudah login di tempat lain
      if (foundUser.session_token) {
        throw new Error("Akun ini sedang login di perangkat lain.");
      }
  
      // Generate token dan update user
      const token = uuidv4();
  
      await axios.put(`${API_URL}/users/${foundUser.id}`, {
        ...foundUser,
        session_token: token,
        user_update_at: new Date().toISOString(),
      });
  
      // Simpan ke localStorage
      const updatedUser = { ...foundUser, session_token: token };
      localStorage.setItem("user", JSON.stringify(updatedUser));
  
      return updatedUser;
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  // ✅ LOGOUT USER
  const logout = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
      try {
        await axios.put(`${API_URL}/users/${user.id}`, {
          ...user,
          session_token: "", // Kosongkan session
          user_update_at: new Date().toISOString(),
        });
      } catch (err) {
        console.error("Logout error:", err);
      }
    }
  
    localStorage.removeItem("user");
  };

  return { register, login, logout, getUserById, getAllUsers, deleteUser };
}
