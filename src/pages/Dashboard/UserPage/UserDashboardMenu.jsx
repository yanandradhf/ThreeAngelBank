export function UserDashboardMenu(){
    return(
        <main className="ml-0 lg:ml-64 pt-30 pb-10 px-6 h-full min-w-full bg-gradient-to-br from-emerald-50 to-emerald-100">
          <div className="max-w-5xl mx-auto">
            {/* Button Tambah Rekening */}
            <div className="flex justify-end mb-4">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition-colors duration-200 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                Tambah Rekening
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-emerald-100">
                <span className="text-sm text-gray-500 mb-2">Saldo Utama</span>
                <span className="text-3xl font-bold text-emerald-700 mb-2">Rp 12.500.000</span>
                <span className="text-xs text-gray-400">No. Rekening: 1234567890</span>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-emerald-100">
                <span className="text-sm text-gray-500 mb-2">Tabungan</span>
                <span className="text-2xl font-bold text-emerald-700 mb-2">Rp 2.000.000</span>
                <span className="text-xs text-gray-400">No. Rekening: 0987654321</span>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-emerald-100">
                <span className="text-sm text-gray-500 mb-2">Deposito</span>
                <span className="text-2xl font-bold text-emerald-700 mb-2">Rp 5.000.000</span>
                <span className="text-xs text-gray-400">No. Rekening: 1122334455</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-emerald-100">
              <h2 className="text-xl font-semibold text-emerald-700 mb-4">Ringkasan Transaksi Terakhir</h2>
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-500 text-sm border-b">
                    <th className="py-2">Tanggal</th>
                    <th className="py-2">Deskripsi</th>
                    <th className="py-2">Jumlah</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 text-[#434343]">12/07/2025</td>
                    <td className="py-2 text-[#434343]">Transfer ke BCA</td>
                    <td className="py-2 text-emerald-600 font-semibold">-Rp 1.000.000</td>
                    <td className="py-2"><span className="px-2 py-1 rounded bg-emerald-100 text-emerald-700 text-xs">Sukses</span></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-[#434343]">11/07/2025</td>
                    <td className="py-2 text-[#434343]">Top Up</td>
                    <td className="py-2 text-emerald-600 font-semibold">+Rp 2.000.000</td>
                    <td className="py-2"><span className="px-2 py-1 rounded bg-emerald-100 text-emerald-700 text-xs">Sukses</span></td>
                  </tr>
                  <tr>
                    <td className="py-2 text-[#434343]">10/07/2025</td>
                    <td className="py-2 text-[#434343]">Pembayaran PLN</td>
                    <td className="py-2 text-emerald-600 font-semibold">-Rp 500.000</td>
                    <td className="py-2"><span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs">Pending</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
    )
}