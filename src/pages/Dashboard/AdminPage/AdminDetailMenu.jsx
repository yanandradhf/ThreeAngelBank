import { useEffect, useState } from "react";
import { useAuth } from "../../../context/useAuth";

export function AdminDetailMenu() {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getUserById } = useAuth();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.id) {
      getUserById(user.id)
        .then(setAdminData)
        .catch((err) => console.error("Gagal ambil data admin:", err))
        .finally(() => setLoading(false));
    }
  }, [user?.id]);

  if (loading || !adminData) {
    return (
      <main className="pt-30 ps-50 pb-30 flex items-center justify-center">
        <p className="text-gray-500">Memuat data profil admin...</p>
      </main>
    );
  }

  return (
    <main className="pt-30 ps-50 pb-30 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-10 w-full max-w-xl flex flex-col items-center gap-8 mx-4">
        <div className="flex flex-col items-center gap-4">
          <img
            src="https://www.mauicardiovascularsymposium.com/wp-content/uploads/2019/08/dummy-profile-pic-300x300.png"
            alt="Admin Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-emerald-200 shadow"
          />
          <h2 className="text-2xl font-bold text-emerald-700">
            {adminData.user_firstname} {adminData.user_lastname}
          </h2>
          <span className="text-gray-500">{adminData.user_email}</span>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Jenis Kelamin</span>
            <span className="font-semibold text-emerald-700 capitalize">
              {adminData.user_gender.toLowerCase()}
            </span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Tanggal Lahir</span>
            <span className="font-semibold text-emerald-700">
              {adminData.user_birth}
            </span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">No. HP</span>
            <span className="font-semibold text-emerald-700">
              {adminData.user_phone}
            </span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Kota</span>
            <span className="font-semibold text-emerald-700">
              {adminData.user_city}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Bergabung Sejak</span>
            <span className="font-semibold text-emerald-700">
              {new Date(adminData.user_created_at).toLocaleDateString("id-ID")}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
