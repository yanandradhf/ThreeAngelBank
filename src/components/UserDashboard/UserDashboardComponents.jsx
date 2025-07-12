import { useEffect, useState } from "react";
import { useAccount } from "../../hooks/useAccount";

export default function UserDashboardComponent() {
  const [accounts, setAccounts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ account_type: "", account_balance: "" });
  const user = JSON.parse(localStorage.getItem("user"));
  const { getAccountsByUserId, addAccount } = useAccount();

  useEffect(() => {
    if (user?.id) {
      getAccountsByUserId(user.id).then(setAccounts);
    }
  }, [user]);

  const handleAddAccount = async (e) => {
    e.preventDefault();
    if (!form.account_type || !form.account_balance)
      return alert("Lengkapi data!");
    const newAcc = await addAccount({
      user_id: user.id,
      account_type: form.account_type,
      account_balance: Number(form.account_balance),
    });
    setAccounts((prev) => [...prev, newAcc]);
    setForm({ account_type: "", account_balance: "" });
    setShowForm(false);
  };

  const totalBalance = accounts.reduce(
    (sum, acc) => sum + Number(acc.account_balance),
    0
  );

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Welcome, {user?.user_firstname}
      </h2>

      <div className="bg-white rounded-xl shadow p-4">
        <p className="text-lg font-semibold text-gray-700">Total Balance</p>
        <p className="text-2xl font-bold text-green-600">
          Rp{totalBalance.toLocaleString()}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map((acc) => (
          <div key={acc.id} className="bg-white rounded-xl shadow p-4">
            <p className="text-sm text-gray-500 mb-1">
              {acc.account_type.toUpperCase()}
            </p>
            <p className="text-md font-semibold text-gray-700">
              No: {acc.account_number}
            </p>
            <p className="text-lg font-bold text-green-600">
              Rp{Number(acc.account_balance).toLocaleString()}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Status: {acc.account_status}
            </p>
          </div>
        ))}
      </div>

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          + Tambah Rekening
        </button>
      ) : (
        <form
          onSubmit={handleAddAccount}
          className="bg-white p-4 rounded-xl shadow space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipe Rekening
            </label>
            <select
              value={form.account_type}
              onChange={(e) =>
                setForm({ ...form, account_type: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">-- Pilih --</option>
              <option value="saving">Saving</option>
              <option value="deposit">Deposit</option>
              <option value="payroll">Payroll</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Saldo Awal
            </label>
            <input
              type="number"
              value={form.account_balance}
              onChange={(e) =>
                setForm({ ...form, account_balance: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Simpan Rekening
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
