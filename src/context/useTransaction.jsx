import axios from "axios";

const API_JSON_SERVER = "http://localhost:5001"; // json-server untuk transaksi
const API_MOCKAPI =
  "https://687288d776a5723aacd50eeb.mockapi.io/ThreeAngelsBank"; // mockapi.io untuk akun

export function useTransaction() {
  const getAllTransactionsByUser = async (userId) => {
    const accountRes = await axios.get(`${API_MOCKAPI}/accounts`, {
      params: { user_id: userId },
    });
    const userAccounts = accountRes.data;
    const userAccountIds = userAccounts.map((acc) => String(acc.id));

    const txRes = await axios.get(`${API_JSON_SERVER}/transactions`);
    const allTx = txRes.data;

    const result = allTx
      .filter(
        (tx) =>
          userAccountIds.includes(String(tx.account_id_sender)) ||
          userAccountIds.includes(String(tx.account_id_receiver))
      )
      .map((tx) => {
        let type = tx.transaction_type;
        if (type === "transfer") {
          if (userAccountIds.includes(String(tx.account_id_sender))) {
            type = "outgoing_transfer";
          } else {
            type = "incoming_transfer";
          }
        }
        return {
          ...tx,
          transaction_type: type,
        };
      });

    return result;
  };

  const createTransaction = async ({
    transaction_type,
    account_id_sender,
    account_id_receiver,
    transaction_amount,
    transaction_description,
  }) => {
    const now = new Date().toISOString();

    try {
      // Ambil semua transaksi untuk menentukan ID baru
      const txRes = await axios.get(`${API_JSON_SERVER}/transactions`);
      const maxId = txRes.data.reduce((max, tx) => {
        const idNum = parseInt(tx.id);
        return isNaN(idNum) ? max : Math.max(max, idNum);
      }, 0);
      const newId = String(maxId + 1); // <-- ID harus string

      const newTransaction = {
        id: newId,
        transaction_type,
        account_id_sender,
        account_id_receiver,
        transaction_amount,
        transaction_description,
        transaction_status: "success",
        transaction_created_at: now,
        transaction_updated_at: now,
      };

      // Ambil akun pengirim
      const senderRes = await axios.get(
        `${API_MOCKAPI}/accounts/${String(account_id_sender)}`
      );
      const sender = senderRes.data;

      let updatedSenderBalance = Number(sender.account_balance);
      if (transaction_type === "deposit") {
        updatedSenderBalance += Number(transaction_amount);
      } else {
        updatedSenderBalance -= Number(transaction_amount);
      }

      const updatedSender = {
        ...sender,
        account_balance: updatedSenderBalance,
        account_updated_at: now,
      };

      await axios.put(
        `${API_MOCKAPI}/accounts/${String(sender.id)}`,
        updatedSender
      );

      // Jika transfer ke akun lain, update penerima
      if (
        transaction_type === "transfer" &&
        account_id_receiver !== account_id_sender
      ) {
        const receiverRes = await axios.get(
          `${API_MOCKAPI}/accounts/${String(account_id_receiver)}`
        );
        const receiver = receiverRes.data;

        const updatedReceiver = {
          ...receiver,
          account_balance:
            Number(receiver.account_balance) + Number(transaction_amount),
          account_updated_at: now,
        };

        await axios.put(
          `${API_MOCKAPI}/accounts/${String(receiver.id)}`,
          updatedReceiver
        );
      }

      const txPost = await axios.post(
        `${API_JSON_SERVER}/transactions`,
        newTransaction
      );

      return txPost.data;
    } catch (err) {
      console.error("❌ Gagal dalam proses transaksi:", err);

      if (axios.isAxiosError(err)) {
        console.error("🔍 Axios error detail:", {
          message: err.message,
          code: err.code,
          status: err.response?.status,
          data: err.response?.data,
          url: err.config?.url,
        });
      } else {
        console.error("🔍 Non-Axios Error:", err);
      }

      throw err;
    }
  };

  return { getAllTransactionsByUser, createTransaction };
}
