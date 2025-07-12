import { useState } from "react";

export function UserTransferMenu() {
  const [form, setForm] = useState({
    transactionType: "withdraw",
    sourceAccount: "",
    destinationAccount: "",
    amount: "",
    description: ""
  });

  // Dummy data rekening sumber dana
  const accounts = [
    { no: "1234567890", type: "Saving", saldo: 12500000 },
    { no: "0987654321", type: "Tabungan", saldo: 2000000 },
    { no: "1122334455", type: "Deposito", saldo: 5000000 },
  ];

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
        <h2 className="text-2xl font-bold text-emerald-700 mb-2 text-center">Transfer Dana</h2>
        {/* Jenis Transaksi */}
        <div>
          <label htmlFor="transactionType" className="block text-sm font-medium text-gray-700 mb-2">Jenis Transaksi</label>
          <select
            id="transactionType"
            name="transactionType"
            value={form.transactionType}
            onChange={handleChange}
            className="w-full px-4 py-3 border text-[#000] border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50"
            required
          >
            <option value="withdraw">Withdraw</option>
            <option value="transfer">Transfer</option>
          </select>
        </div>
        {/* Rekening Sumber Dana */}
        <div>
          <label htmlFor="sourceAccount" className="block text-sm font-medium text-gray-700 mb-2">Rekening Sumber Dana</label>
          <select
            id="sourceAccount"
            name="sourceAccount"
            value={form.sourceAccount}
            onChange={handleChange}
            className="w-full px-4 py-3 border text-[#000] border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50"
            required
          >
            <option value="">Pilih rekening</option>
            {accounts.map((acc) => (
              <option key={acc.no} value={acc.no}>
                {acc.no} - {acc.type} - Rp {acc.saldo.toLocaleString()}
              </option>
            ))}
          </select>
        </div>
        {/* Rekening Tujuan */}
        <div>
          <label htmlFor="destinationAccount" className="block text-sm font-medium text-gray-700 mb-2">Rekening Tujuan</label>
          <div className="flex gap-2">
            <input
              type="text"
              id="destinationAccount"
              name="destinationAccount"
              value={form.destinationAccount}
              onChange={handleChange}
              className="flex-1 px-4 py-3 border text-[#000] border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50"
              placeholder="Masukkan nomor rekening tujuan"
              required
            />
            <button
              type="button"
              className="px-4 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors shadow"
              onClick={() => alert('Fitur cari rekening belum diimplementasikan')}
            >
              Cari
            </button>
          </div>
        </div>
        {/* Jumlah Transfer */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">Jumlah Transfer</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full px-4 py-3 border text-[#000] border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50"
            placeholder="Masukkan jumlah transfer"
            required
            min="1"
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
            placeholder="Deskripsi transfer (opsional)"
            rows={3}
          />
        </div>
        {/* Button Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-md"
        >
          Kirim
        </button>
      </form>
    </main>
  );
}