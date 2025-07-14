import { useNavigate } from "react-router-dom";
import { useRegisterStore } from "../../stores/registerStore";
import { useState } from "react";

export function RegisterStep1() {
  const { form, updateForm, nextStep, reset } = useRegisterStore();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  // Validasi ketika klik Next

  const handleBack = () => {
    navigate("/login");
    reset();
  };
  const handleNext = () => {
    const newErrors = {};

    if (!form.user_email) {
      newErrors.user_email = "Email wajib diisi.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.user_email)) {
      newErrors.user_email = "Format email tidak valid.";
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
          className="flex-1 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
