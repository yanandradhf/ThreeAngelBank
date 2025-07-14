import { useNavigate } from "react-router-dom";
import { useRegisterStore } from "../../stores/registerStore";
import { useState } from "react";
import axios from "axios";
const API_URL = "https://687288d776a5723aacd50eeb.mockapi.io/ThreeAngelsBank";

export function RegisterStep1() {
  const { form, updateForm, nextStep, reset } = useRegisterStore();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  console.log(form);

  // Validasi ketika klik Next

  const handleBack = () => {
    navigate("/login");
    reset();
  };
  const handleNext = async () => {
    const newErrors = {};

    if (!form.user_email) {
      newErrors.user_email = "Email wajib diisi.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.user_email)) {
      newErrors.user_email = "Format email tidak valid.";
    } else {
      try {
        const res = await axios.get(`${API_URL}/users`);
        const existing = res.data.find(
          (u) => u.user_email.toLowerCase() === form.user_email.toLowerCase()
        );
        if (existing) {
          newErrors.user_email = "Email sudah terdaftar.";
        }
      } catch (err) {
        newErrors.user_email = "Gagal cek email. Coba lagi.";
      }
    }

    if (!form.user_firstname)
      newErrors.user_firstname = "First Name wajib diisi.";
    if (!form.user_lastname) newErrors.user_lastname = "Last Name wajib diisi.";
    if (!form.user_gender)
      newErrors.user_gender = "Pilih gender terlebih dahulu.";
    if (!form.user_birth) newErrors.user_birth = "Tanggal lahir wajib diisi.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      nextStep();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <input
          type="email"
          placeholder="Email"
          value={form.user_email}
          onChange={(e) => updateForm({ user_email: e.target.value })}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.user_email && (
          <p className="text-red-600 text-sm mt-1">{errors.user_email}</p>
        )}
      </div>

      <div>
        <input
          placeholder="First Name"
          value={form.user_firstname}
          onChange={(e) => updateForm({ user_firstname: e.target.value })}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.user_firstname && (
          <p className="text-red-600 text-sm mt-1">{errors.user_firstname}</p>
        )}
      </div>

      <div>
        <input
          placeholder="Last Name"
          value={form.user_lastname}
          onChange={(e) => updateForm({ user_lastname: e.target.value })}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.user_lastname && (
          <p className="text-red-600 text-sm mt-1">{errors.user_lastname}</p>
        )}
      </div>

      <div>
        <select
          value={form.user_gender}
          onChange={(e) => updateForm({ user_gender: e.target.value })}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {errors.user_gender && (
          <p className="text-red-600 text-sm mt-1">{errors.user_gender}</p>
        )}
      </div>

      <div>
        <input
          type="date"
          value={form.user_birth}
          onChange={(e) => updateForm({ user_birth: e.target.value })}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.user_birth && (
          <p className="text-red-600 text-sm mt-1">{errors.user_birth}</p>
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleBack}
          className="flex-1 bg-gray-300 text-gray-800 py-3 rounded hover:bg-gray-400 transition"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="flex-1 bg-green-600 text-white py-3 rounded hover:bg-green-700 transition disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
