import { useEffect, useState } from "react";
import { useAuth } from "../../../context/useAuth";
import { useNavigate } from "react-router-dom";

export function AdminUserManagement() {
  const { getAllUsers, deleteUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  

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

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus user ini?");
    if (!confirm) return;

    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      alert("Gagal menghapus user.");
      console.error(err);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 5;

// Hitung data yg akan ditampilkan di halaman ini
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

// Hitung jumlah halaman
const totalPages = Math.ceil(users.length / itemsPerPage);

// Fungsi ganti halaman
const goToNextPage = () => {
  if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
};

const goToPrevPage = () => {
  if (currentPage > 1) setCurrentPage((prev) => prev - 1);
};

  return (
    <main className="p-6 pt-24 max-w-6xl mx-auto ml-64">
      <h1 className="text-2xl font-bold text-emerald-700 mb-6">
        Manajemen Pengguna
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border">
          <table className="min-w-full bg-white text-left">
            <thead className="bg-emerald-100 text-emerald-700">
              <tr>
                <th className="py-3 px-4">Nama</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">First Name</th>
                <th className="py-3 px-4">Last Name</th>
                <th className="py-3 px-4">Gender</th>
                <th className="py-3 px-4">Birthday</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">City</th>
                <th className="py-3 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-emerald-50 transition"
                >
                  <td className="py-3 px-4">
                    {user.user_firstname} {user.user_lastname}
                  </td>
                  <td className="py-3 px-4">{user.user_email}</td>
                  <td className="py-3 px-4">{user.user_firstname}</td>
                  <td className="py-3 px-4">{user.user_lastname}</td>
                  <td className="py-3 px-4">{user.user_gender}</td>
                  <td className="py-3 px-4">{user.user_birth}</td>
                  <td className="py-3 px-4">{user.user_phone}</td>
                  <td className="py-3 px-4">{user.user_city}</td>
                  <td className="py-3 px-4 space-x-2">
                    {/* <button
                      onClick={() => navigate(`/admin/users/${user.id}/edit`)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      Edit
                    </button> */}
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-6 text-gray-400">
                    Tidak ada pengguna.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
            <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
            >
                Previous
            </button>
            <span className="text-gray-600">
                Halaman {currentPage} dari {totalPages}
            </span>
            <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
      )}
    </main>
  );
}
