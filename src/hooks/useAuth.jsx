import axios from "axios";

const API_URL = "https://687288d776a5723aacd50eeb.mockapi.io/ThreeAngelsBank";

export function useAuth() {
  const register = async (formData) => {
    const newUser = {
      ...formData,
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

  const getUserById = async (userId) => {
    const res = await axios.get(`${API_URL}/users/${userId}`);
    return res.data;
  };

  return { register, login, getUserById };
}
