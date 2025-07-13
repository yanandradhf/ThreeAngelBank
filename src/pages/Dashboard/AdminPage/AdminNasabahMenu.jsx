import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const API_JSON_SERVER = "http://localhost:5001"; // transaksi
const API_MOCKAPI =
  "https://687288d776a5723aacd50eeb.mockapi.io/ThreeAngelsBank"; // rekening & nasabah

export function AdminNasabahMenu() {
  const [nasabahCount, setNasabahCount] = useState(0);
  const [nasabahList, setNasabahList] = useState([]);
  const [rekeningCount, setRekeningCount] = useState(0);
  const [rekeningList, setRekeningList] = useState([]);
  const [totalDana, setTotalDana] = useState(0);
  const [rekeningByType, setRekeningByType] = useState({});
  const [savingCount, setSavingCount] = useState(0);
  const [payrollCount, setPayrollCount] = useState(0);
  const [depositCount, setDepositCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [dormantCount, setDormantCount] = useState(0);
  const [suspendCount, setSuspendCount] = useState(0);
  const [topAccounts, setTopAccounts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [nasabahRes, rekeningRes, transaksiRes] = await Promise.all([
        axios.get(`${API_MOCKAPI}/users`),
        axios.get(`${API_MOCKAPI}/accounts`),
        axios.get(`${API_JSON_SERVER}/transactions`),
      ]);

      // Jumlah data
      setNasabahCount(nasabahRes.data.length);
      
      // Hitung jumlah rekening per nasabah
      const nasabahWithAccountCount = nasabahRes.data.map(nasabah => {
        const accountCount = rekeningRes.data.filter(rekening => 
          rekening.user_id === nasabah.id || 
          rekening.userId === nasabah.id ||
          rekening.nasabah_id === nasabah.id
        ).length;
        
        return {
          ...nasabah,
          accountCount: accountCount || 1 // Default 1 jika tidak ada rekening ditemukan
        };
      });
      
      setNasabahList(nasabahWithAccountCount);
      console.log("📋 Data Nasabah dari API:", nasabahRes.data.slice(0, 3)); // Log 3 data pertama untuk melihat struktur
      console.log("🏦 Data Rekening dari API:", rekeningRes.data.slice(0, 3)); // Log untuk melihat struktur rekening
      setRekeningCount(rekeningRes.data.length);
      setRekeningList(rekeningRes.data);

      // Total dana
      const total = rekeningRes.data.reduce(
        (acc, item) => acc + Number(item.account_balance || 0),
        0
      );
      setTotalDana(total);

      // Rekening berdasarkan type
      const typeCounts = rekeningRes.data.reduce((acc, item) => {
        const type = item.account_type || "lainnya";
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});
      setRekeningByType(typeCounts);

      // Hitung jumlah rekening spesifik
      const saving = rekeningRes.data.filter(item => 
        item.account_type?.toLowerCase() === 'saving' || 
        item.account_type?.toLowerCase() === 'tabungan'
      ).length;
      const payroll = rekeningRes.data.filter(item => 
        item.account_type?.toLowerCase() === 'payroll' || 
        item.account_type?.toLowerCase() === 'gaji'
      ).length;
      const deposit = rekeningRes.data.filter(item => 
        item.account_type?.toLowerCase() === 'deposit' || 
        item.account_type?.toLowerCase() === 'deposito'
      ).length;

      setSavingCount(saving);
      setPayrollCount(payroll);
      setDepositCount(deposit);

      // Hitung jumlah rekening berdasarkan status
      const active = rekeningRes.data.filter(item => 
        item.account_status?.toLowerCase() === 'active' || 
        item.account_status?.toLowerCase() === 'aktif'
      ).length;
      const dormant = rekeningRes.data.filter(item => 
        item.account_status?.toLowerCase() === 'dormant' || 
        item.account_status?.toLowerCase() === 'tidak aktif'
      ).length;
      const suspend = rekeningRes.data.filter(item => 
        item.account_status?.toLowerCase() === 'suspend' || 
        item.account_status?.toLowerCase() === 'suspended' ||
        item.account_status?.toLowerCase() === 'ditangguhkan'
      ).length;

      setActiveCount(active);
      setDormantCount(dormant);
      setSuspendCount(suspend);

      // Hitung TOP 10 rekening dengan transaksi terbanyak
      const transactionCounts = {};
      transaksiRes.data.forEach(transaction => {
        const accountNumber = transaction.from_account || transaction.to_account || transaction.account_number;
        if (accountNumber) {
          transactionCounts[accountNumber] = (transactionCounts[accountNumber] || 0) + 1;
        }
      });

      // Gabungkan dengan data rekening dan urutkan
      const accountsWithTransactions = Object.entries(transactionCounts)
        .map(([accountNumber, count]) => {
          const account = rekeningRes.data.find(acc => acc.account_number === accountNumber);
          return {
            accountNumber,
            transactionCount: count,
            accountType: account?.account_type || 'Unknown',
            balance: account?.account_balance || 0
          };
        })
        .sort((a, b) => b.transactionCount - a.transactionCount)
        .slice(0, 10);

      setTopAccounts(accountsWithTransactions);
    } catch (error) {
      console.error("❌ Error fetching admin dashboard data:", error);
    }
  };

  return (
    <main className="pt-7 flex items-center justify-center">
      <div className="max-w-6xl mx-auto pb-24 w-full px-4">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-emerald-700 mb-10"
        >
          Data Nasabah
        </motion.h1>        {/* Summary Cards */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 w-full">
            <div className="md:col-span-2">
              <NasabahListCard nasabahList={nasabahList} nasabahCount={nasabahCount} />
            </div>
            <div className="md:col-span-1">
              <TopAccountsCard topAccounts={topAccounts} />
            </div>
          </div>
        </div>

        {/* Account List Card - Full Width */}
        <div className="flex justify-center mb-10">
          <div className="w-full">
            <RekeningListCard 
              rekeningList={rekeningList} 
              rekeningCount={rekeningCount}
              totalDana={totalDana}
            />
          </div>
        </div>

        
      </div>
    </main>
  );
}

// Card Component
function Card({ title, value, icon, isFullWidth = false }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`bg-white rounded-2xl shadow-xl border border-emerald-100 p-6 text-center flex flex-col items-center ${
        isFullWidth ? 'py-8' : ''
      }`}
    >
      <div className={`mb-2 ${isFullWidth ? 'text-4xl' : 'text-3xl'}`}>{icon}</div>
      <h2 className={`text-gray-500 mb-1 ${isFullWidth ? 'text-lg' : 'text-md'}`}>{title}</h2>
      <span className={`font-bold text-emerald-700 ${isFullWidth ? 'text-3xl' : 'text-2xl'}`}>{value}</span>
    </motion.div>
  );
}

// Nasabah List Card Component
function NasabahListCard({ nasabahList, nasabahCount }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Tampilkan 4 nasabah per halaman

  // Data dummy untuk nasabah dengan informasi lengkap
  const dummyNasabah = [
    { 
      id: 1, 
      name: "Budi Santoso", 
      gender: "L", 
      email: "budi.santoso@email.com", 
      birthDate: "1985-03-15", 
      city: "Jakarta",
      accountCount: 3
    },
    { 
      id: 2, 
      name: "Sari Dewi", 
      gender: "P", 
      email: "sari.dewi@email.com", 
      birthDate: "1990-07-22", 
      city: "Bandung",
      accountCount: 2
    },
    { 
      id: 3, 
      name: "Ahmad Rahman", 
      gender: "L", 
      email: "ahmad.rahman@email.com", 
      birthDate: "1988-12-08", 
      city: "Surabaya",
      accountCount: 1
    },
    { 
      id: 4, 
      name: "Maya Putri", 
      gender: "P", 
      email: "maya.putri@email.com", 
      birthDate: "1992-01-30", 
      city: "Medan",
      accountCount: 4
    },
    { 
      id: 5, 
      name: "Andi Wijaya", 
      gender: "L", 
      email: "andi.wijaya@email.com", 
      birthDate: "1987-05-14", 
      city: "Makassar",
      accountCount: 2
    },
    { 
      id: 6, 
      name: "Lisa Andriani", 
      gender: "P", 
      email: "lisa.andriani@email.com", 
      birthDate: "1991-09-18", 
      city: "Yogyakarta",
      accountCount: 1
    },
    { 
      id: 7, 
      name: "Rizki Pratama", 
      gender: "L", 
      email: "rizki.pratama@email.com", 
      birthDate: "1989-11-25", 
      city: "Semarang",
      accountCount: 2
    },
    { 
      id: 8, 
      name: "Nina Sari", 
      gender: "P", 
      email: "nina.sari@email.com", 
      birthDate: "1993-04-12", 
      city: "Palembang",
      accountCount: 1
    },
    { 
      id: 9, 
      name: "Dedi Kurniawan", 
      gender: "L", 
      email: "dedi.kurniawan@email.com", 
      birthDate: "1986-08-20", 
      city: "Denpasar",
      accountCount: 3
    },
    { 
      id: 10, 
      name: "Fitri Handayani", 
      gender: "P", 
      email: "fitri.handayani@email.com", 
      birthDate: "1994-06-30", 
      city: "Balikpapan",
      accountCount: 2
    }
  ];

  // Fungsi untuk menghitung umur dari tanggal lahir
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  // Fungsi untuk format tanggal
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  // Gunakan data dari API jika tersedia, jika tidak gunakan dummy data
  const allNasabah = nasabahList.length > 0 ? nasabahList : dummyNasabah;
  
  // Filter berdasarkan search term
  const filteredNasabah = allNasabah.filter(nasabah => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (nasabah.name || nasabah.username || '').toLowerCase().includes(searchLower) ||
      (nasabah.email || '').toLowerCase().includes(searchLower) ||
      (nasabah.city || '').toLowerCase().includes(searchLower)
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredNasabah.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNasabah = filteredNasabah.slice(startIndex, endIndex);

  // Reset ke halaman 1 ketika search berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalCount = nasabahCount > 0 ? nasabahCount : dummyNasabah.length;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-4 h-full"
    >
      <div className="mb-6">
        <div className="text-center mb-4 mt-3">
          <h2 className="text-2xl font-bold text-emerald-700 mb-2">List Data Nasabah</h2>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari nama, email, atau kota..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
          <span className="absolute left-2 top-2 text-gray-400">🔍</span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
        {searchTerm && (
          <p className="text-xs text-gray-500 mt-1">
            Ditemukan {filteredNasabah.length} nasabah dari pencarian "{searchTerm}"
          </p>
        )}
      </div>
      
      <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
        {currentNasabah.length > 0 ? (
          currentNasabah.map((nasabah, index) => (
            <div key={nasabah.id || index} className="p-3 bg-gray-50 rounded-lg border-l-4 border-emerald-500">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-emerald-600">
                      {(nasabah.name || nasabah.username || `User ${index + 1}`).charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm font-semibold text-gray-800 truncate">
                        {nasabah.name || nasabah.username || `User ${index + 1}`}
                      </h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        (nasabah.gender || 'L') === 'L' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-pink-100 text-pink-700'
                      }`}>
                        {(nasabah.gender || 'L') === 'L' ? '♂ L' : '♀ P'}
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center text-xs text-gray-600">
                        <span className="w-4">📧</span>
                        <span className="truncate">{nasabah.email || `user${index + 1}@email.com`}</span>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-600">
                        <span className="w-4">🎂</span>
                        <span>
                          {nasabah.birthDate 
                            ? `${formatDate(nasabah.birthDate)} (${calculateAge(nasabah.birthDate)} thn)`
                            : '01/01/1990 (34 thn)'
                          }
                        </span>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-600">
                        <span className="w-4">🏙️</span>
                        <span>{nasabah.city || 'Jakarta'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right flex-shrink-0 ml-2">
                  <div className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full">
                    {nasabah.accountCount || 1} Rek
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 text-sm py-8">
            {searchTerm ? (
              <>
                <div className="text-2xl mb-2">🔍</div>
                <p>Tidak ada nasabah yang cocok</p>
                <p className="text-xs">dengan pencarian "{searchTerm}"</p>
              </>
            ) : (
              <>
                <div className="text-2xl mb-2">📝</div>
                <p>Belum ada data nasabah</p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            Hal {currentPage} dari {totalPages}
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-2 py-1 text-xs rounded ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              ← Prev
            </button>
            
            {/* Page numbers */}
            {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
              let pageNum;
              if (totalPages <= 3) {
                pageNum = i + 1;
              } else if (currentPage <= 2) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 1) {
                pageNum = totalPages - 2 + i;
              } else {
                pageNum = currentPage - 1 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-2 py-1 text-xs rounded ${
                    currentPage === pageNum
                      ? 'bg-emerald-100 text-emerald-700 font-bold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-2 py-1 text-xs rounded ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// Rekening List Card Component
function RekeningListCard({ rekeningList, rekeningCount, totalDana }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const itemsPerPage = 6; // Tampilkan 6 rekening per halaman

  // Data dummy untuk rekening dengan informasi lengkap
  const dummyRekening = [
    { 
      id: 1,
      account_number: "1234567890",
      account_type: "Saving",
      owner_name: "Budi Santoso",
      account_balance: 15000000,
      created_date: "2023-01-15",
      account_status: "Active"
    },
    { 
      id: 2,
      account_number: "2345678901",
      account_type: "Payroll",
      owner_name: "Sari Dewi",
      account_balance: 8500000,
      created_date: "2023-02-20",
      account_status: "Active"
    },
    { 
      id: 3,
      account_number: "3456789012",
      account_type: "Saving",
      owner_name: "Ahmad Rahman",
      account_balance: 12750000,
      created_date: "2023-01-30",
      account_status: "Dormant"
    },
    { 
      id: 4,
      account_number: "4567890123",
      account_type: "Deposit",
      owner_name: "Maya Putri",
      account_balance: 25000000,
      created_date: "2023-03-10",
      account_status: "Active"
    },
    { 
      id: 5,
      account_number: "5678901234",
      account_type: "Saving",
      owner_name: "Andi Wijaya",
      account_balance: 6200000,
      created_date: "2023-02-05",
      account_status: "Active"
    },
    { 
      id: 6,
      account_number: "6789012345",
      account_type: "Payroll",
      owner_name: "Lisa Andriani",
      account_balance: 9800000,
      created_date: "2023-04-12",
      account_status: "Suspended"
    },
    { 
      id: 7,
      account_number: "7890123456",
      account_type: "Saving",
      owner_name: "Rizki Pratama",
      account_balance: 11500000,
      created_date: "2023-03-25",
      account_status: "Active"
    },
    { 
      id: 8,
      account_number: "8901234567",
      account_type: "Deposit",
      owner_name: "Nina Sari",
      account_balance: 18750000,
      created_date: "2023-01-08",
      account_status: "Active"
    },
    { 
      id: 9,
      account_number: "9012345678",
      account_type: "Saving",
      owner_name: "Dedi Kurniawan",
      account_balance: 7300000,
      created_date: "2023-04-18",
      account_status: "Dormant"
    },
    { 
      id: 10,
      account_number: "0123456789",
      account_type: "Payroll",
      owner_name: "Fitri Handayani",
      account_balance: 13200000,
      created_date: "2023-02-28",
      account_status: "Active"
    }
  ];

  // Fungsi untuk format tanggal
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  // Fungsi untuk format mata uang
  const formatCurrency = (amount) => {
    return `Rp ${Number(amount).toLocaleString('id-ID')}`;
  };

  // Gunakan data dari API jika tersedia, jika tidak gunakan dummy data
  const allRekening = rekeningList.length > 0 ? rekeningList : dummyRekening;
  
  // Filter berdasarkan search term, status, dan type
  const filteredRekening = allRekening.filter(rekening => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = (
      (rekening.account_number || '').toLowerCase().includes(searchLower) ||
      (rekening.owner_name || rekening.account_holder || '').toLowerCase().includes(searchLower) ||
      (rekening.account_type || '').toLowerCase().includes(searchLower)
    );
    
    const matchesStatus = filterStatus === 'all' || 
      (rekening.account_status || '').toLowerCase() === filterStatus.toLowerCase();
    
    const matchesType = filterType === 'all' || 
      (rekening.account_type || '').toLowerCase() === filterType.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredRekening.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRekening = filteredRekening.slice(startIndex, endIndex);

  // Reset ke halaman 1 ketika filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus, filterType]);

  const totalCount = rekeningCount > 0 ? rekeningCount : dummyRekening.length;
  const currentTotalDana = totalDana > 0 ? totalDana : dummyRekening.reduce((sum, rek) => sum + rek.account_balance, 0);

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-6"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="text-center mb-4 mt-3">
          <h2 className="text-2xl font-bold text-emerald-700 mb-2">List Data Rekening</h2>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Cari nomor rekening, nama pemilik, atau tipe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
          <span className="absolute left-3 top-3 text-gray-400">🔍</span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
        
        {/* Filter Dropdowns */}
        <div className="flex space-x-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">Semua Status</option>
            <option value="active">Active</option>
            <option value="dormant">Dormant</option>
            <option value="suspended">Suspended</option>
          </select>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">Semua Tipe</option>
            <option value="saving">Saving</option>
            <option value="payroll">Payroll</option>
            <option value="deposit">Deposit</option>
          </select>
        </div>
        
        {(searchTerm || filterStatus !== 'all' || filterType !== 'all') && (
          <p className="text-xs text-gray-500">
            Ditemukan {filteredRekening.length} rekening dari {allRekening.length} total rekening
          </p>
        )}
      </div>
      
      {/* Rekening List */}
      <div className="space-y-4 max-h-96 overflow-y-auto mb-6">
        {currentRekening.length > 0 ? (
          currentRekening.map((rekening, index) => (
            <div key={rekening.id || rekening.account_number || index} className="p-5 bg-white rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Column 1: Account Info */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        (rekening.account_type || 'Saving') === 'Saving' 
                          ? 'bg-blue-100 text-blue-700' 
                          : (rekening.account_type || 'Saving') === 'Payroll'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {rekening.account_type || 'Saving'}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 tracking-wider">
                      {rekening.account_number || `ACC${String(index + 1).padStart(6, '0')}`}
                    </h3>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Pemilik Rekening</p>
                    <p className="text-sm font-medium text-gray-700">{rekening.owner_name || rekening.account_holder || 'Nama Pemilik'}</p>
                  </div>
                </div>
                
                {/* Column 2: Financial Info */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Saldo Rekening</p>
                    <p className="text-xl font-bold text-emerald-600">
                      {formatCurrency(rekening.account_balance || 0)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Tanggal Pembukaan</p>
                    <p className="text-sm text-gray-700 font-medium">
                      {formatDate(rekening.created_date || rekening.created_at || '2023-01-01')}
                    </p>
                  </div>
                </div>
                
                {/* Column 3: Status & ID */}
                <div className="flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Status Rekening</p>
                    <span className={`inline-block px-3 py-2 text-sm font-semibold rounded-lg ${
                      (rekening.account_status || 'Active').toLowerCase() === 'active' 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : (rekening.account_status || 'Active').toLowerCase() === 'dormant'
                        ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                        : 'bg-red-100 text-red-700 border border-red-200'
                    }`}>
                      {rekening.account_status || 'Active'}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Account ID</p>
                    <p className="text-sm font-mono text-gray-600">
                      #{rekening.id || index + 1}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            {searchTerm || filterStatus !== 'all' || filterType !== 'all' ? (
              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-gray-400 rounded-full border-dashed"></div>
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-600 mb-1">Tidak ada rekening yang cocok</p>
                  <p className="text-sm text-gray-500">Coba ubah kriteria pencarian atau filter</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto bg-emerald-50 rounded-full flex items-center justify-center border-2 border-emerald-200 border-dashed">
                  <div className="w-8 h-8 bg-emerald-100 rounded"></div>
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-600 mb-1">Belum ada data rekening</p>
                  <p className="text-sm text-gray-500">Data rekening akan muncul di sini setelah ditambahkan</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            Halaman {currentPage} dari {totalPages} • Menampilkan {currentRekening.length} dari {filteredRekening.length} rekening
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 text-sm rounded ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              ← Sebelumnya
            </button>
            
            {/* Page numbers */}
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 text-sm rounded ${
                    currentPage === pageNum
                      ? 'bg-emerald-100 text-emerald-700 font-bold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 text-sm rounded ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              Selanjutnya →
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// Top Accounts Card Component
function TopAccountsCard({ topAccounts }) {
  // Data dummy untuk TOP 10 rekening
  const dummyTopAccounts = [
    { accountNumber: "1234567890", transactionCount: 45, accountType: "Saving", ownerName: "Budi Santoso" },
    { accountNumber: "2345678901", transactionCount: 38, accountType: "Payroll", ownerName: "Sari Dewi" },
    { accountNumber: "3456789012", transactionCount: 32, accountType: "Saving", ownerName: "Ahmad Rahman" },
    { accountNumber: "4567890123", transactionCount: 28, accountType: "Deposit", ownerName: "Maya Putri" },
    { accountNumber: "5678901234", transactionCount: 25, accountType: "Saving", ownerName: "Andi Wijaya" },
    { accountNumber: "6789012345", transactionCount: 22, accountType: "Payroll", ownerName: "Lisa Andriani" },
    { accountNumber: "7890123456", transactionCount: 19, accountType: "Saving", ownerName: "Rizki Pratama" },
    { accountNumber: "8901234567", transactionCount: 16, accountType: "Deposit", ownerName: "Nina Sari" },
    { accountNumber: "9012345678", transactionCount: 13, accountType: "Saving", ownerName: "Dedi Kurniawan" },
    { accountNumber: "0123456789", transactionCount: 10, accountType: "Payroll", ownerName: "Fitri Handayani" }
  ];

  // Gunakan data dummy untuk sementara
  const displayAccounts = dummyTopAccounts;
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-4 h-full"
    >
      <div className="text-center mb-4">
        <div className="text-2xl mb-2">🏆</div>
        <h2 className="text-md text-gray-500 mb-1">TOP 10 Rekening Aktif</h2>
        <span className="text-sm text-gray-400">Berdasarkan jumlah transaksi</span>
      </div>
      
      <div className="space-y-2 max-h-90 overflow-y-auto">
        {displayAccounts.length > 0 ? (
          displayAccounts.map((account, index) => (
            <div key={account.accountNumber} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-emerald-600 w-4">#{index + 1}</span>
                <div>
                  <div className="text-xs font-medium text-gray-800">
                    {account.ownerName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {account.accountNumber.slice(-6)} • {account.accountType}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-emerald-700">{account.transactionCount}x</div>
                <div className="text-xs text-gray-400">transaksi</div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 text-sm py-4">
            Belum ada data transaksi
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Section Component
function Section({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-6 mb-10"
    >
      <h2 className="text-2xl font-bold text-emerald-700 mb-6">{title}</h2>
      {children}
    </motion.div>
  );
}
