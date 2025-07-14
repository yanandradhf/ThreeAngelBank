import { useState, useEffect } from "react";
import { useAccount } from "../../../context/useAccount";
import { useTransaction } from "../../../context/useTransaction";
import { useAuth } from "../../../context/useAuth";

export function UserTransferMenu() {
  const [form, setForm] = useState({
    transactionType: "withdraw",
    sourceAccount: "",
    destinationAccount: "",
    amount: "",
    description: "",
  });

  const [destinationInfo, setDestinationInfo] = useState(null);
  const [destinationError, setDestinationError] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const { getAccountsByUserId, getAccountByNumber } = useAccount();
  const { getUserById } = useAuth();
  const { createTransaction } = useTransaction();

  useEffect(() => {
    if (user?.id) {
      getAccountsByUserId(user.id).then(setAccounts);
    }
  }, [user?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "destinationAccount") {
      setDestinationInfo(null);
      setDestinationError("");
    }
  };

  const handleSearchDestination = async () => {
    setDestinationInfo(null);
    setDestinationError("");

    if (!form.destinationAccount) {
      setDestinationError("Nomor rekening harus diisi.");
      return;
    }

    try {
      const acc = await getAccountByNumber(form.destinationAccount);
      if (!acc) {
        setDestinationError("Rekening tidak ditemukan.");
        return;
      }

      if (String(acc.user_id) === String(user.id)) {
        setDestinationError("Tidak dapat transfer ke rekening sendiri.");
        return;
      }

      const userData = await getUserById(acc.user_id);
      setDestinationInfo({
        name: `${userData.user_firstname} ${userData.user_lastname}`,
        type: acc.account_type,
        id: acc.id,
        account_number: acc.account_number,
      });
    } catch (err) {
      console.error("Error mencari rekening tujuan:", err);
      setDestinationError("Terjadi kesalahan saat mencari rekening.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const source = accounts.find(
      (acc) => acc.account_number === form.sourceAccount
    );

    if (!source) {
      alert("Rekening sumber tidak valid.");
      return;
    }

    const amount = Number(form.amount);

    if (form.transactionType !== "deposit" && source.account_balance < amount) {
      alert("Saldo tidak mencukupi.");
      return;
    }

    if (form.transactionType === "transfer" && !destinationInfo) {
      alert("Silakan cari dan pilih rekening tujuan terlebih dahulu.");
      return;
    }

    setLoading(true);
    try {
      await createTransaction({
        transaction_type:
          form.transactionType === "withdraw" ? "withdraw" : "transfer",
        account_id_sender: String(source.id),
        account_id_receiver:
          form.transactionType === "transfer"
            ? String(destinationInfo?.id)
            : String(source.id),
        transaction_amount: amount,
        transaction_description: form.description,
      });

      alert("✅ Transaksi berhasil!");
      setForm({
        transactionType: "withdraw",
        sourceAccount: "",
        destinationAccount: "",
        amount: "",
        description: "",
      });
      setDestinationInfo(null);
      setDestinationError("");
    } catch (err) {
      console.error("Gagal memproses transaksi:", err);
      alert("❌ Gagal memproses transaksi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center pt-16 pb-10 min-h-screen bg-slate-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-2xl border border-emerald-100 p-4 sm:p-8 md:p-10 w-full max-w-md flex flex-col gap-5 mx-2"
      >
        <h2 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-emerald-600 via-emerald-400 to-green-400 bg-clip-text text-transparent text-center mb-2 sm:mb-6 tracking-wide">
          💸 Transfer Dana
        </h2>

        {/* Jenis Transaksi */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
            Jenis Transaksi
          </label>
          <select
            name="transactionType"
            value={form.transactionType}
            onChange={handleChange}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border text-[#000] border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50"
            required
          >
            <option value="withdraw">Withdraw</option>
            <option value="transfer">Transfer</option>
          </select>
        </div>

        {/* Rekening Sumber */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
            Rekening Sumber
          </label>
          <select
            name="sourceAccount"
            value={form.sourceAccount}
            onChange={handleChange}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border text-[#000] border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50"
            required
          >
            <option value="">Pilih rekening</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.account_number}>
                {acc.account_number} - {acc.account_type} - Rp{" "}
                {Number(acc.account_balance).toLocaleString()}
              </option>
            ))}
          </select>
        </div>

        {/* Rekening Tujuan */}
        {form.transactionType === "transfer" && (
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
              Rekening Tujuan
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                name="destinationAccount"
                value={form.destinationAccount}
                onChange={handleChange}
                className="flex-1 px-3 py-2 sm:px-4 sm:py-3 border text-[#000] border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50"
                placeholder="Masukkan nomor rekening"
                required
              />
              <button
                type="button"
                onClick={handleSearchDestination}
                className="px-4 py-2 sm:px-4 sm:py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors shadow text-sm"
              >
                Cari
              </button>
            </div>
            {destinationInfo && (
              <p className="text-xs sm:text-sm text-green-600 mt-1">
                Ditemukan: <strong>{destinationInfo.name}</strong> ({destinationInfo.type})
              </p>
            )}
            {destinationError && (
              <p className="text-xs sm:text-sm text-red-600 mt-1">{destinationError}</p>
            )}
          </div>
        )}

        {/* Jumlah */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
            Jumlah
          </label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border text-[#000] border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50"
            placeholder="Masukkan jumlah"
            required
            min="1"
          />
        </div>

        {/* Deskripsi */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
            Deskripsi
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border text-[#000] border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50"
            placeholder="Deskripsi transfer (opsional)"
            rows={2}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 sm:py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-md text-base"
        >
          {loading ? "Memproses..." : "Kirim Dana"}
        </button>
      </form>
    </main>
  );
}
