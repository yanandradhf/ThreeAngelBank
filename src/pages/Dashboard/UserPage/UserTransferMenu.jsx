import { useState } from "react";

export function UserTransferMenu() {
  const [form, setForm] = useState({
    accountType: "saving",
    accountName: "",
    initialBalance: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle pengajuan rekening logic
    alert(`Pengajuan Rekening: ${JSON.stringify(form, null, 2)}`);
  };

  return (
    <main className="h-[100%] w-screen bg-gradient-to-br from-emerald-50 to-emerald-100 ps-50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-8 w-full max-w-lg flex flex-col mt-40 mb-40 gap-6 mx-4">
        <h2 className="text-2xl font-bold text-emerald-700 mb-2 text-center">Pengajuan Rekening Baru</h2>
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
            <option value="tabungan">Tabungan</option>
            <option value="deposito">Deposito</option>
            <option value="bisnis">Bisnis</option>
            <option value="investasi">Investasi</option>
          </select>
        </div>
        {/* Nama Rekening */}
        <div>
          <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-2">Nama Rekening</label>
          <input
            type="text"
            id="accountName"
            name="accountName"
            value={form.accountName}
            onChange={handleChange}
            className="w-full px-4 py-3 border text-[#000] border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50"
            placeholder="Masukkan nama rekening"
            required
          />
        </div>
        {/* Saldo Awal */}
        <div>
          <label htmlFor="initialBalance" className="block text-sm font-medium text-gray-700 mb-2">Saldo Awal</label>
          <input
            type="number"
            id="initialBalance"
            name="initialBalance"
            value={form.initialBalance}
            onChange={handleChange}
            className="w-full px-4 py-3 border text-[#000] border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50"
            placeholder="Masukkan saldo awal"
            required
            min="0"
          />
        </div>
        {/* Deskripsi */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-4 py-3 border text-[#000] border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50"
            placeholder="Deskripsi rekening (opsional)"
            rows={3}
          />
        </div>
        {/* Button Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-md"
        >
          Ajukan Rekening
        </button>
      </form>
    </main>
  );
}