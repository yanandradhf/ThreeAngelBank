import axios from "axios";

const API_URL = "https://687288d776a5723aacd50eeb.mockapi.io/ThreeAngelsBank";

export function useAccount() {
  const addAccount = async ({ user_id, account_type, account_balance }) => {
    // Ambil semua akun dulu
    const res = await axios.get(`${API_URL}/accounts`);
    const accounts = res.data;

    // Cari max ID numerik untuk bikin nomor unik
    const maxId = accounts.reduce((max, acc) => {
      const numericId = parseInt(acc.id, 10);
      return isNaN(numericId) ? max : Math.max(max, numericId);
    }, 0);

    // Generate nomor rekening: "001" + 7 digit dari maxId+1
    const nextAccountNumber = `001${String(maxId + 1).padStart(7, "0")}`;

    const newAccount = {
      user_id,
      account_number: nextAccountNumber,
      account_type,
      account_balance: Number(account_balance),
      account_status: "active",
      account_created_at: new Date().toISOString(),
      account_updated_at: new Date().toISOString(),
    };

    const result = await axios.post(`${API_URL}/accounts`, newAccount);
    return result.data;
  };

  const getAccountsByUserId = async (user_id) => {
    const res = await axios.get(`${API_URL}/accounts`, {
      params: { user_id },
    });
    return res.data;
  };

  const getAccountByNumber = async (account_number) => {
    const res = await axios.get(`${API_URL}/accounts`);
    const found = res.data.find(
      (acc) => String(acc.account_number) === String(account_number)
    );
    return found || null;
  };

  return {
    addAccount,
    getAccountsByUserId,
    getAccountByNumber,
  };
}
