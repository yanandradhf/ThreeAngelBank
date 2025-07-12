import axios from "axios";

const API_JSON_SERVER = "http://localhost:5001"; // json-server untuk transaksi
const API_MOCKAPI =
  "https://687288d776a5723aacd50eeb.mockapi.io/ThreeAngelsBank"; // mockapi.io untuk akun

export function useTransaction() {
  const getAllTransactionsByUser = async (userId) => {
    // 1. Ambil semua akun milik user
    const accountRes = await axios.get(`${API_MOCKAPI}/accounts`, {
      params: { user_id: userId },
    });
    const userAccounts = accountRes.data;
    const userAccountIds = userAccounts.map((acc) => String(acc.id));

    // 2. Ambil semua transaksi
    const txRes = await axios.get(`${API_JSON_SERVER}/transactions`);
    const allTx = txRes.data;

    // 3. Filter transaksi yg terkait user dan tandai transfer masuk/keluar
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
      // 1️⃣ Cari ID terakhir dari transaksi JSON Server
      const txRes = await axios.get(`${API_JSON_SERVER}/transactions`);
      const maxId = txRes.data.reduce((max, tx) => {
        return typeof tx.id === "number" ? Math.max(max, tx.id) : max;
      }, 0);
      const newId = maxId + 1;

      // 2️⃣ Buat transaksi baru
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

      // 3️⃣ Ambil akun pengirim
      const senderRes = await axios.get(
        `${API_MOCKAPI}/accounts/${String(account_id_sender)}`
      );
      const sender = senderRes.data;

      console.log("📦 Data akun pengirim:", sender);

      // 4️⃣ Hitung saldo baru pengirim
      let updatedSenderBalance = Number(sender.account_balance);
      if (transaction_type === "deposit") {
        updatedSenderBalance += Number(transaction_amount);
      } else {
        updatedSenderBalance -= Number(transaction_amount);
      }

      // 5️⃣ Kirim PUT update saldo pengirim
      const updatedSender = {
        ...sender,
        account_balance: updatedSenderBalance,
        account_updated_at: now,
      };

      console.log("📤 Akan PUT akun pengirim:", updatedSender);

      const putSender = await axios.put(
        `${API_MOCKAPI}/accounts/${String(sender.id)}`,
        updatedSender
      );

      console.log("✅ PUT saldo pengirim berhasil:", putSender.data);

      // 6️⃣ Kalau transfer, update akun penerima
      if (
        transaction_type === "transfer" &&
        account_id_receiver !== account_id_sender
      ) {
        const receiverRes = await axios.get(
          `${API_MOCKAPI}/accounts/${String(account_id_receiver)}`
        );
        const receiver = receiverRes.data;

        console.log("📦 Data akun penerima:", receiver);

        const updatedReceiver = {
          ...receiver,
          account_balance:
            Number(receiver.account_balance) + Number(transaction_amount),
          account_updated_at: now,
        };

        console.log("📤 Akan PUT akun penerima:", updatedReceiver);

        const putReceiver = await axios.put(
          `${API_MOCKAPI}/accounts/${String(receiver.id)}`,
          updatedReceiver
        );

        console.log("✅ PUT saldo penerima berhasil:", putReceiver.data);
        console.log("📤 Akan simpan transaksi:", newTransaction);
      }
      const txPost = await axios.post(
        `${API_JSON_SERVER}/transactions`,
        newTransaction
      );
      console.log("✅ Transaksi disimpan di json-server:", txPost.data);

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
