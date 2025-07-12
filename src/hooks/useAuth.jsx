import axios from "axios";
const API_URL = "http://localhost:5001";

export function useAuth() {
  const register = async (formData) => {
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
  };

  const login = async ({ user_email, user_password }) => {
    const res = await axios.get(`${API_URL}/users`, {
      params: { user_email, user_password },
    });
    return res.data.length > 0 ? res.data[0] : null;
  };

  return { register, login };
}
