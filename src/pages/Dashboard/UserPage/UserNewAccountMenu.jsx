import { useState } from "react";

export function UserNewAccountMenu() {
  const [form, setForm] = useState({
    accountType: "saving"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Tipe Rekening: ${form.accountType}`);
  };

  return (
    <main className="h-[100%] w-screen bg-gradient-to-br from-emerald-50 to-emerald-100 ps-50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-8 w-full max-w-lg flex flex-col mt-40 mb-40 gap-6 mx-4">
        <h2 className="text-2xl font-bold text-emerald-700 mb-2 text-center">Tambah Rekening Baru</h2>
        {/* Tipe Rekening */}
        <div>
          <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 mb-2">Tipe Rekening</label>
          <select
            id="accountType"
            name="accountType"
            value={form.accountType}
            onChange={handleChange}
            className="w-full px-4 py-3 border text-[#000] border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50"
            required
          >
            <option value="saving">Saving</option>
            <option value="tabungan">Payroll</option>
            <option value="deposito">Deposito</option>
          </select>
        </div>
        {/* Button Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-md"
        >
          Tambah Rekening
        </button>
      </form>
    </main>
  );
}