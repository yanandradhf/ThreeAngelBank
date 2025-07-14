import { useEffect, useState } from "react";
import { useAuth } from "../../../context/useAuth";

export function UserDetailMenu() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getUserById } = useAuth();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.id) {
      getUserById(user.id)
        .then(setUserData)
        .catch((err) => console.error("Gagal ambil data user:", err))
        .finally(() => setLoading(false));
    }
  }, [user?.id]);

  if (loading || !userData) {
    return (
      <main className="pt-24 pb-24 flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500">Memuat data profil...</p>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-16 flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-4 sm:p-8 md:p-10 w-full max-w-md sm:max-w-xl flex flex-col items-center gap-8 mx-2">
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <img
            src="https://www.mauicardiovascularsymposium.com/wp-content/uploads/2019/08/dummy-profile-pic-300x300.png"
            alt="Profile"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-emerald-200 shadow"
          />
          <h2 className="text-lg sm:text-2xl font-bold text-emerald-700 text-center">
            {userData.user_firstname} {userData.user_lastname}
          </h2>
          <span className="text-xs sm:text-sm text-gray-500 text-center break-all">{userData.user_email}</span>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between border-b pb-2 text-xs sm:text-base">
            <span className="text-gray-500">Jenis Kelamin</span>
            <span className="font-semibold text-emerald-700 capitalize">
              {userData.user_gender.toLowerCase()}
            </span>
          </div>
          <div className="flex justify-between border-b pb-2 text-xs sm:text-base">
            <span className="text-gray-500">Tanggal Lahir</span>
            <span className="font-semibold text-emerald-700">
              {userData.user_birth}
            </span>
          </div>
          <div className="flex justify-between border-b pb-2 text-xs sm:text-base">
            <span className="text-gray-500">No. HP</span>
            <span className="font-semibold text-emerald-700">
              {userData.user_phone}
            </span>
          </div>
          <div className="flex justify-between border-b pb-2 text-xs sm:text-base">
            <span className="text-gray-500">Kota</span>
            <span className="font-semibold text-emerald-700">
              {userData.user_city}
            </span>
          </div>
          <div className="flex justify-between text-xs sm:text-base">
            <span className="text-gray-500">Bergabung Sejak</span>
            <span className="font-semibold text-emerald-700">
              {new Date(userData.user_created_at).toLocaleDateString("id-ID")}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
