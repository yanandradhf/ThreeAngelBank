import { useNavigate } from "react-router-dom";

export function AdminDashboardMenu(){
    const navigate = useNavigate();
    return(
        <main className="pt-30 ps-50 flex items-center justify-center">
          <div className="max-w-5xl mx-auto pb-30">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-emerald-100">
                <span className="text-sm text-gray-500 mb-2">Jumlah Nasabah</span>
                <span className="text-3xl font-bold text-emerald-700 mb-2">1.250</span>
              </div>
  
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-emerald-100">
                <span className="text-sm text-gray-500 mb-2">Jumlah Rekening</span>
                <span className="text-2xl font-bold text-emerald-700 mb-2">2.800</span>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-emerald-100">
                <span className="text-sm text-gray-500 mb-2">Jumlah Transaksi</span>
                <span className="text-2xl font-bold text-emerald-700 mb-2">28.239</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-emerald-100 flex flex-col items-center justify-center w-full">
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-500">Total Dana Nasabah</span>
                <h2 className="text-3xl font-bold text-emerald-700 mt-2">Rp 98.500.000.000</h2>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-8 mb-8">
              <h2 className="text-1xl font-bold text-emerald-700 mb-6 text-center">Rekening Berdasarkan Tipe</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-emerald-600 rounded-xl shadow-lg p-6 flex flex-col items-center border border-emerald-100">
                  <span className="text-sm text-[#fff] mb-2">Rekening Saving</span>
                  <span className="text-3xl font-bold text-[#fff] mb-2">1.250</span>
                </div>
                <div className="bg-emerald-600 rounded-xl shadow-lg p-6 flex flex-col items-center border border-emerald-100">
                  <span className="text-sm text-[#fff] mb-2">Rekening Payroll</span>
                  <span className="text-2xl font-bold text-[#fff] mb-2">2.800</span>
                </div>
                <div className="bg-emerald-600 rounded-xl shadow-lg p-6 flex flex-col items-center border border-emerald-100">
                  <span className="text-sm text-[#fff] mb-2">Rekening Deposit</span>
                  <span className="text-2xl font-bold text-[#fff] mb-2">28.239</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-8 mb-8">
              <h2 className="text-1xl font-bold text-emerald-700 mb-6 text-center">Rekening Berdasarkan Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-emerald-600 rounded-xl shadow-lg p-6 flex flex-col items-center border border-emerald-100">
                  <span className="text-sm text-[#fff] mb-2">Rekening Active</span>
                  <span className="text-3xl font-bold text-[#fff] mb-2">1.250</span>
                </div>
                <div className="bg-emerald-600 rounded-xl shadow-lg p-6 flex flex-col items-center border border-emerald-100">
                  <span className="text-sm text-[#fff] mb-2">Rekening Dormant</span>
                  <span className="text-2xl font-bold text-[#fff] mb-2">2.800</span>
                </div>
                <div className="bg-emerald-600 rounded-xl shadow-lg p-6 flex flex-col items-center border border-emerald-100">
                  <span className="text-sm text-[#fff] mb-2">Rekening Suspend</span>
                  <span className="text-2xl font-bold text-[#fff] mb-2">28.239</span>
                </div>
              </div>
            </div>

          </div>
        </main>
    )
}