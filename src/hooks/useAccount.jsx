import axios from "axios";
const API_URL = "http://localhost:5001";

export function useAccount() {
  const addAccount = async ({ user_id, account_type, account_balance }) => {
    const accounts = await axios.get(`${API_URL}/accounts`);
    const maxId = accounts.data.reduce((max, acc) => Math.max(max, acc.id), 0);
    const accountNumber = `001${String(maxId + 1).padStart(7, "0")}`;

    const newAccount = {
      id: maxId + 1,
      user_id,
      account_type,
      account_number: accountNumber,
      account_balance: Number(account_balance),
      account_status: "active",
      account_created_at: new Date().toISOString(),
      account_updated_at: new Date().toISOString(),
    };

    const res = await axios.post(`${API_URL}/accounts`, newAccount);
    return res.data;
  };

  const getAccountsByUserId = async (user_id) => {
    const res = await axios.get(`${API_URL}/accounts`, {
      params: { user_id },
    });
    return res.data;
  };

  return { addAccount, getAccountsByUserId };
}
