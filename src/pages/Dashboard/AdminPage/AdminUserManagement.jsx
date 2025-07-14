import { useEffect, useState } from "react";
import { useAuth } from "../../../context/useAuth";
import { motion } from "framer-motion";

export function AdminUserManagement() {
  const { getAllUsers, deleteUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const result = await getAllUsers();
        setUsers(result);
      } catch (err) {
        console.error("Gagal mengambil data user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus user ini?")) return;

    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      alert("Gagal menghapus user.");
      console.error(err);
    }
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.user_firstname} ${user.user_lastname}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      user.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.user_city?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-6"
    >
    <main className="pt-24 ps-50 flex items-center justify-center">
      <Section title="Data Pengguna">
        {/* Search */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Cari nama, email, atau kota..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <span className="absolute left-3 top-3 text-gray-400">🔍</span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* User List */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {loading ? (
            <p>Loading...</p>
          ) : currentUsers.length > 0 ? (
            currentUsers.map((user, index) => (
              <div
                key={user.id || index}
                className="p-5 bg-white rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Column 1: Name & Email */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-gray-800">
                      {user.user_firstname} {user.user_lastname}
                    </h3>
                    <p className="text-sm text-gray-600">{user.user_email}</p>
                  </div>

                  {/* Column 2: Gender, Birthday */}
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Gender</p>
                      <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                        user.user_gender === 'Male'
                          ? 'bg-blue-100 text-blue-700'
                          : user.user_gender === 'Female'
                          ? 'bg-pink-100 text-pink-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.user_gender || "Unknown"}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Birthday</p>
                      <p className="text-sm text-gray-700">{user.user_birth}</p>
                    </div>
                  </div>

                  {/* Column 3: Phone, City, Action */}
                  <div className="flex flex-col justify-between space-y-2">
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Phone</p>
                      <p className="text-sm text-gray-700">{user.user_phone}</p>
                      <p className="text-xs text-gray-500 uppercase mt-2">City</p>
                      <p className="text-sm text-gray-700">{user.user_city}</p>
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-16">
              Tidak ada pengguna yang cocok.
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-4">
            <div className="text-sm text-gray-500">
              Halaman {currentPage} dari {totalPages} • Menampilkan {currentUsers.length} dari {filteredUsers.length} pengguna
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 text-sm rounded ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-emerald-600 hover:bg-emerald-50"
                }`}
              >
                ← Sebelumnya
              </button>

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
                        ? "bg-emerald-100 text-emerald-700 font-bold"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-3 py-1 text-sm rounded ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-emerald-600 hover:bg-emerald-50"
                }`}
              >
                Selanjutnya →
              </button>
            </div>
          </div>
        )}
      </Section>
    </main>
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