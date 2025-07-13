import axios from "axios";
const API_URL = "http://localhost:5001";

export function useTransaction() {
  const getTransactionsByAccount = async (account_id) => {
    const res = await axios.get(`${API_URL}/transactions`, {
      params: {
        account_id_sender: account_id,
      },
    });
    return res.data;
  };

  const createTransaction = async ({
    transaction_type,
    account_id_sender,
    account_id_receiver,
    transaction_amount,
    transaction_description,
  }) => {
    const now = new Date().toISOString();

    const newTransaction = {
      transaction_type,
      account_id_sender: Number(account_id_sender),
      account_id_receiver: Number(account_id_receiver),
      transaction_amount: Number(transaction_amount),
      transaction_description,
      transaction_status: "success",
      transaction_created_at: now,
      transaction_updated_at: now,
    };

    const res = await axios.post(`${API_URL}/transactions`, newTransaction);

    // update saldo rekening
    const senderRes = await axios.get(
      `${API_URL}/accounts/${account_id_sender}`
    );
    const receiverRes =
      account_id_sender !== account_id_receiver
        ? await axios.get(`${API_URL}/accounts/${account_id_receiver}`)
        : senderRes;

    const sender = senderRes.data;
    const receiver = receiverRes.data;

    // Update saldo
    if (transaction_type === "withdraw") {
      await axios.patch(`${API_URL}/accounts/${sender.id}`, {
        account_balance: sender.account_balance - transaction_amount,
        account_updated_at: now,
      });
    } else if (transaction_type === "deposit") {
      await axios.patch(`${API_URL}/accounts/${sender.id}`, {
        account_balance: sender.account_balance + Number(transaction_amount),
        account_updated_at: now,
      });
    } else if (transaction_type === "transfer") {
      await axios.patch(`${API_URL}/accounts/${sender.id}`, {
        account_balance: sender.account_balance - Number(transaction_amount),
        account_updated_at: now,
      });

      await axios.patch(`${API_URL}/accounts/${receiver.id}`, {
        account_balance: receiver.account_balance + Number(transaction_amount),
        account_updated_at: now,
      });
    }

    return res.data;
  };

  return { getTransactionsByAccount, createTransaction };
}
