import { useNavigate } from "react-router-dom";

export function AdminNasabahMenu() {
  const navigate = useNavigate();
  return (
    <main className="pt-30 ps-50 flex items-center justify-center">
      <div className="ms-25 max-w-5xl mx-auto pb-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-8 mb-8 md:col-span-2">
            <h2 className="text-1xl font-bold text-emerald-700 mb-6 text-center">
              Data Nasabah
            </h2>
            <div className="max-h-96 overflow-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-500 text-sm border-b">
                    <th className="py-2">Nama</th>
                    <th className="py-2">Gender</th>
                    <th className="py-2">Birth</th>
                    <th className="py-2">City</th>
                    <th className="py-2">Jml Rekening</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 text-[#434343]">Bima Sakti</td>
                    <td className="py-2 text-[#434343]">Male</td>
                    <td className="py-2 text-[#434343]">1995-07-13</td>
                    <td className="py-2 text-[#434343]">Jakarta</td>
                    <td className="py-2 text-emerald-600 font-semibold">2</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-[#434343]">Raka Putra</td>
                    <td className="py-2 text-[#434343]">Male</td>
                    <td className="py-2 text-[#434343]">1992-03-21</td>
                    <td className="py-2 text-[#434343]">Bandung</td>
                    <td className="py-2 text-emerald-600 font-semibold">3</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-[#434343]">Dewi Lestari</td>
                    <td className="py-2 text-[#434343]">Female</td>
                    <td className="py-2 text-[#434343]">1997-11-05</td>
                    <td className="py-2 text-[#434343]">Surabaya</td>
                    <td className="py-2 text-emerald-600 font-semibold">1</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-[#434343]">Andra Kece</td>
                    <td className="py-2 text-[#434343]">Male</td>
                    <td className="py-2 text-[#434343]">1990-09-30</td>
                    <td className="py-2 text-[#434343]">Medan</td>
                    <td className="py-2 text-emerald-600 font-semibold">2</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-[#434343]">Faiqi Akbar</td>
                    <td className="py-2 text-[#434343]">Male</td>
                    <td className="py-2 text-[#434343]">1998-02-18</td>
                    <td className="py-2 text-[#434343]">Yogyakarta</td>
                    <td className="py-2 text-emerald-600 font-semibold">1</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-[#434343]">Siti Aminah</td>
                    <td className="py-2 text-[#434343]">Female</td>
                    <td className="py-2 text-[#434343]">1996-05-10</td>
                    <td className="py-2 text-[#434343]">Semarang</td>
                    <td className="py-2 text-emerald-600 font-semibold">2</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-[#434343]">Joko Santoso</td>
                    <td className="py-2 text-[#434343]">Male</td>
                    <td className="py-2 text-[#434343]">1989-12-01</td>
                    <td className="py-2 text-[#434343]">Solo</td>
                    <td className="py-2 text-emerald-600 font-semibold">1</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-[#434343]">Lina Marlina</td>
                    <td className="py-2 text-[#434343]">Female</td>
                    <td className="py-2 text-[#434343]">1993-08-22</td>
                    <td className="py-2 text-[#434343]">Palembang</td>
                    <td className="py-2 text-emerald-600 font-semibold">2</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-[#434343]">Agus Pratama</td>
                    <td className="py-2 text-[#434343]">Male</td>
                    <td className="py-2 text-[#434343]">1991-04-17</td>
                    <td className="py-2 text-[#434343]">Makassar</td>
                    <td className="py-2 text-emerald-600 font-semibold">1</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-[#434343]">Mega Sari</td>
                    <td className="py-2 text-[#434343]">Female</td>
                    <td className="py-2 text-[#434343]">1999-10-30</td>
                    <td className="py-2 text-[#434343]">Denpasar</td>
                    <td className="py-2 text-emerald-600 font-semibold">3</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-[#434343]">Rizky Hidayat</td>
                    <td className="py-2 text-[#434343]">Male</td>
                    <td className="py-2 text-[#434343]">1994-06-15</td>
                    <td className="py-2 text-[#434343]">Pontianak</td>
                    <td className="py-2 text-emerald-600 font-semibold">2</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-[#434343]">Dian Permata</td>
                    <td className="py-2 text-[#434343]">Female</td>
                    <td className="py-2 text-[#434343]">1992-01-25</td>
                    <td className="py-2 text-[#434343]">Balikpapan</td>
                    <td className="py-2 text-emerald-600 font-semibold">1</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-[#434343]">Yoga Pratama</td>
                    <td className="py-2 text-[#434343]">Male</td>
                    <td className="py-2 text-[#434343]">1993-03-12</td>
                    <td className="py-2 text-[#434343]">Banjarmasin</td>
                    <td className="py-2 text-emerald-600 font-semibold">2</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-[#434343]">Putri Ayu</td>
                    <td className="py-2 text-[#434343]">Female</td>
                    <td className="py-2 text-[#434343]">1995-09-09</td>
                    <td className="py-2 text-[#434343]">Manado</td>
                    <td className="py-2 text-emerald-600 font-semibold">1</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-[#434343]">Dimas Saputra</td>
                    <td className="py-2 text-[#434343]">Male</td>
                    <td className="py-2 text-[#434343]">1997-07-07</td>
                    <td className="py-2 text-[#434343]">Padang</td>
                    <td className="py-2 text-emerald-600 font-semibold">2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-8 mb-8">
            <h2 className="text-1xl font-bold text-emerald-700 mb-6 text-center">
              5 Rekening Dengan Transaksi Terbanyak
            </h2>
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500 text-sm border-b">
                  <th className="py-2">No. Rekening</th>
                  <th className="py-2">Jml Transaksi</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 text-[#434343]">1234567890</td>
                  <td className="py-2 text-emerald-600 font-semibold">120</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-[#434343]">0987654321</td>
                  <td className="py-2 text-emerald-600 font-semibold">110</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-[#434343]">1122334455</td>
                  <td className="py-2 text-emerald-600 font-semibold">105</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-[#434343]">5566778899</td>
                  <td className="py-2 text-emerald-600 font-semibold">100</td>
                </tr>
                <tr>
                  <td className="py-2 text-[#434343]">6677889900</td>
                  <td className="py-2 text-emerald-600 font-semibold">98</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-8 mb-8 w-full">
          <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-center">
            Data Rekening
          </h2>
          <div className="max-h-96 overflow-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500 text-sm border-b">
                  <th className="py-2">No. Rekening</th>
                  <th className="py-2">Tipe Rekening</th>
                  <th className="py-2">Nama Pemilik</th>
                  <th className="py-2">Saldo</th>
                  <th className="py-2">Tanggal Rilis</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 text-[#434343]">1234567890</td>
                  <td className="py-2 text-[#434343]">Tabungan</td>
                  <td className="py-2 text-[#434343]">Bima Sakti</td>
                  <td className="py-2 text-emerald-600 font-semibold">
                    Rp 12.000.000
                  </td>
                  <td className="py-2 text-[#434343]">2022-01-10</td>
                  <td className="py-2 text-green-600 font-semibold">Aktif</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-[#434343]">0987654321</td>
                  <td className="py-2 text-[#434343]">Giro</td>
                  <td className="py-2 text-[#434343]">Raka Putra</td>
                  <td className="py-2 text-emerald-600 font-semibold">
                    Rp 8.500.000
                  </td>
                  <td className="py-2 text-[#434343]">2021-07-15</td>
                  <td className="py-2 text-red-600 font-semibold">Nonaktif</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-[#434343]">1122334455</td>
                  <td className="py-2 text-[#434343]">Deposito</td>
                  <td className="py-2 text-[#434343]">Dewi Lestari</td>
                  <td className="py-2 text-emerald-600 font-semibold">
                    Rp 20.000.000
                  </td>
                  <td className="py-2 text-[#434343]">2023-03-20</td>
                  <td className="py-2 text-green-600 font-semibold">Aktif</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-[#434343]">5566778899</td>
                  <td className="py-2 text-[#434343]">Tabungan</td>
                  <td className="py-2 text-[#434343]">Andra Kece</td>
                  <td className="py-2 text-emerald-600 font-semibold">
                    Rp 5.000.000
                  </td>
                  <td className="py-2 text-[#434343]">2020-11-05</td>
                  <td className="py-2 text-green-600 font-semibold">Aktif</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-[#434343]">6677889900</td>
                  <td className="py-2 text-[#434343]">Giro</td>
                  <td className="py-2 text-[#434343]">Faiqi Akbar</td>
                  <td className="py-2 text-emerald-600 font-semibold">
                    Rp 3.200.000
                  </td>
                  <td className="py-2 text-[#434343]">2024-02-01</td>
                  <td className="py-2 text-green-600 font-semibold">Aktif</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-[#434343]">2233445566</td>
                  <td className="py-2 text-[#434343]">Deposito</td>
                  <td className="py-2 text-[#434343]">Siti Aminah</td>
                  <td className="py-2 text-emerald-600 font-semibold">
                    Rp 7.000.000
                  </td>
                  <td className="py-2 text-[#434343]">2023-08-12</td>
                  <td className="py-2 text-green-600 font-semibold">Aktif</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-[#434343]">3344556677</td>
                  <td className="py-2 text-[#434343]">Tabungan</td>
                  <td className="py-2 text-[#434343]">Joko Santoso</td>
                  <td className="py-2 text-emerald-600 font-semibold">
                    Rp 2.500.000
                  </td>
                  <td className="py-2 text-[#434343]">2022-05-20</td>
                  <td className="py-2 text-red-600 font-semibold">Nonaktif</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-[#434343]">4455667788</td>
                  <td className="py-2 text-[#434343]">Giro</td>
                  <td className="py-2 text-[#434343]">Lina Marlina</td>
                  <td className="py-2 text-emerald-600 font-semibold">
                    Rp 6.800.000
                  </td>
                  <td className="py-2 text-[#434343]">2021-12-01</td>
                  <td className="py-2 text-green-600 font-semibold">Aktif</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-[#434343]">5566778890</td>
                  <td className="py-2 text-[#434343]">Deposito</td>
                  <td className="py-2 text-[#434343]">Agus Pratama</td>
                  <td className="py-2 text-emerald-600 font-semibold">
                    Rp 9.000.000
                  </td>
                  <td className="py-2 text-[#434343]">2024-01-15</td>
                  <td className="py-2 text-green-600 font-semibold">Aktif</td>
                </tr>
                <tr>
                  <td className="py-2 text-[#434343]">6677889901</td>
                  <td className="py-2 text-[#434343]">Tabungan</td>
                  <td className="py-2 text-[#434343]">Mega Sari</td>
                  <td className="py-2 text-emerald-600 font-semibold">
                    Rp 4.500.000
                  </td>
                  <td className="py-2 text-[#434343]">2023-09-10</td>
                  <td className="py-2 text-green-600 font-semibold">Aktif</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
