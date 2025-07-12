import { useFetch } from "./useFetch";

const API_URL = "http://localhost:5001";

export function useAuth() {
  const { loading, error, request } = useFetch(API_URL);

  const register = async ({ email, password }) => {
    return await request("/users", "POST", {
      email,
      password,
      role: "user",
      created_at: new Date().toISOString(),
    });
  };

  const login = async ({ email, password }) => {
    const users = await request(`/users?email=${email}&password=${password}`);
    if (users?.length > 0) return users[0];
    return null;
  };

  return { loading, error, register, login };
}
