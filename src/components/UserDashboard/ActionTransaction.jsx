import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { useTransaction } from "../../context/useTransaction";
import { useAccount } from "../../context/useAccount";

export default function CreateTransaction() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [accounts, setAccounts] = useState([]);
  const [form, setForm] = useState({
    transaction_type: "deposit",
    account_id_sender: "",
    account_number_receiver: "",
    transaction_amount: "",
    transaction_description: "",
  });
  const [receiverInfo, setReceiverInfo] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingReceiver, setCheckingReceiver] = useState(false);

  const { getAccountsByUserId } = useAccount();
  const { createTransaction } = useTransaction();

  useEffect(() => {
    if (user) {
      getAccountsByUserId(user.id).then(setAccounts);
    }
  }, [user]);

  const handleReceiverCheck = async () => {
    setCheckingReceiver(true);
    try {
      const res = await fetch(
        `http://localhost:5001/accounts?account_number=${form.account_number_receiver}`
      );
      const data = await res.json();
      if (data.length === 0) {
        setReceiverInfo(null);
        setError("No rekening tujuan tidak ditemukan.");
        toast.error("No rekening tujuan tidak ditemukan.");
      } else {
        setReceiverInfo(data[0]);
        setError("");
        toast.success("Rekening tujuan ditemukan!");
      }
    } catch (err) {
      setError("Gagal mencari rekening.");
      toast.error("Gagal mencari rekening.");
    }
    setCheckingReceiver(false);
  };

  const handleSubmit = async () => {
    setError("");

    if (!form.account_id_sender || !form.transaction_amount) {
      setError("Mohon lengkapi semua kolom.");
      toast.error("Mohon lengkapi semua kolom.");
      return;
    }

    const senderAccount = accounts.find(
      (acc) => acc.id === Number(form.account_id_sender)
    );

    if (!senderAccount) {
      toast.error("Rekening sumber tidak valid.");
      return;
    }

    if (form.transaction_type !== "deposit") {
      if (Number(form.transaction_amount) > senderAccount.account_balance) {
        toast.error("Saldo tidak mencukupi.");
        return;
      }
    }

    if (form.transaction_type === "transfer" && !receiverInfo) {
      toast.error("Rekening tujuan belum dicek.");
      return;
    }

    let receiverId =
      form.transaction_type === "transfer"
        ? receiverInfo.id
        : form.account_id_sender;

    try {
      setLoading(true);
      await createTransaction({
        transaction_type: form.transaction_type,
        account_id_sender: form.account_id_sender,
        account_id_receiver: receiverId,
        transaction_amount: form.transaction_amount,
        transaction_description: form.transaction_description,
      });

      toast.success("Transaksi berhasil!");

      setForm({
        transaction_type: "deposit",
        account_id_sender: "",
        account_number_receiver: "",
        transaction_amount: "",
        transaction_description: "",
      });
      setReceiverInfo(null);
    } catch (err) {
      console.error(err);
      toast.error("Transaksi gagal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-bold">Buat Transaksi</h2>

      <Toaster position="top-center" reverseOrder={false} />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="space-y-2">
        <label className="block font-medium">Jenis Transaksi</label>
        <select
          className="w-full border p-2 rounded"
          value={form.transaction_type}
          onChange={(e) =>
            setForm({ ...form, transaction_type: e.target.value })
          }
        >
          <option value="deposit">Deposit</option>
          <option value="withdraw">Withdraw</option>
          <option value="transfer">Transfer</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Rekening Sumber</label>
        <select
          className="w-full border p-2 rounded"
          value={form.account_id_sender}
          onChange={(e) =>
            setForm({ ...form, account_id_sender: e.target.value })
          }
        >
          <option value="">-- Pilih --</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.account_number} - {acc.account_type}
            </option>
          ))}
        </select>

        {form.account_id_sender && (
          <p className="text-sm text-gray-600">
            Saldo: Rp{" "}
            {accounts
              .find((a) => a.id === Number(form.account_id_sender))
              ?.account_balance.toLocaleString()}
          </p>
        )}
      </div>

      {form.transaction_type === "transfer" && (
        <div className="space-y-2">
          <label className="block font-medium">No Rekening Tujuan</label>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 border p-2 rounded"
              value={form.account_number_receiver}
              onChange={(e) =>
                setForm({ ...form, account_number_receiver: e.target.value })
              }
            />
            <button
              onClick={handleReceiverCheck}
              className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-60"
              disabled={checkingReceiver}
            >
              {checkingReceiver ? "Cek..." : "Cek"}
            </button>
          </div>
          {receiverInfo && (
            <p className="text-sm text-green-600">
              Rekening ditemukan ({receiverInfo.account_type}) milik user ID{" "}
              {receiverInfo.user_id}
            </p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <label className="block font-medium">Jumlah</label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={form.transaction_amount}
          onChange={(e) =>
            setForm({ ...form, transaction_amount: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Deskripsi</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={form.transaction_description}
          onChange={(e) =>
            setForm({ ...form, transaction_description: e.target.value })
          }
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Memproses..." : "Kirim Transaksi"}
      </button>
    </div>
  );
}
