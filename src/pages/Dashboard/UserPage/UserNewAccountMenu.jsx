import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../../../context/useAccount";

export function UserNewAccountMenu() {
  const navigate = useNavigate();
  const { addAccount } = useAccount();
  const [form, setForm] = useState({
    account_type: "saving",
    account_balance: 300000,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!localUser || !localUser.id) {
      alert("User tidak ditemukan. Silakan login kembali.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      await addAccount({
        user_id: localUser.id,
        account_type: form.account_type,
        account_balance: form.account_balance,
      });
      alert("✅ Rekening berhasil ditambahkan!");
      navigate("/user/dashboard");
    } catch (err) {
      console.error("❌ Gagal menambahkan rekening:", err);
      alert("Gagal menambah rekening.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="ps-50 flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-8 w-full max-w-lg flex flex-col gap-6 mx-4 mt-24 mb-24"
      >
        <h2 className="text-3xl font-extrabold text-emerald-700 mb-6 text-center">
          📄 Buat Rekening Baru
        </h2>

        {/* Tipe Rekening */}
        <div>
          <label
            htmlFor="account_type"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Pilih Tipe Rekening
          </label>
          <select
            id="account_type"
            name="account_type"
            value={form.account_type}
            onChange={handleChange}
            className="w-full px-4 py-3 border text-[#000] border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50"
            required
          >
            <option value="saving">Saving</option>
            <option value="payroll">Payroll</option>
            <option value="deposito">Deposito</option>
          </select>
        </div>

        {/* Saldo Awal */}
        <div>
          <label
            htmlFor="account_balance"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Saldo Awal
          </label>
          <input
            type="number"
            id="account_balance"
            name="account_balance"
            value={form.account_balance}
            onChange={handleChange}
            className="w-full px-4 py-3 border text-[#000] border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50"
            min={50000}
            required
          />
          <small className="text-gray-400 text-xs mt-1">
            Minimal saldo awal Rp 50.000
          </small>
        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:to-emerald-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
        >
          {loading ? "Menyimpan..." : "Tambah Rekening"}
        </button>
      </form>
    </main>
  );
}
