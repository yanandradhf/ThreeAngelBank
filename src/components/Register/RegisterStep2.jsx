import { useRegisterStore } from "../../stores/registerStore";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export default function RegisterStep2() {
  const { form, updateForm, nextStep, prevStep } = useRegisterStore();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleNext = () => {
    const newErrors = {};

    if (!form.user_phone) newErrors.user_phone = "Phone wajib diisi.";
    else if (!/^\d+$/.test(form.user_phone))
      newErrors.user_phone = "Phone hanya boleh angka.";

    if (!form.user_city) newErrors.user_city = "City wajib diisi.";

    if (!form.user_password) {
      newErrors.user_password = "Password wajib diisi.";
    } else if (form.user_password.length < 8) {
      newErrors.user_password = "Password minimal 8 karakter.";
    }

    if (form.user_password !== form.confirm_password) {
      newErrors.confirm_password = "Password tidak sama.";
    }

    if (!form.account_type) newErrors.account_type = "Pilih tipe akun.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      nextStep();
    }
  };

  return (
    <div className="space-y-4">
      {/* Phone */}
      <input
        placeholder="Phone"
        value={form.user_phone}
        onChange={(e) => {
          const value = e.target.value;
          if (/^\d*$/.test(value)) {
            updateForm({ user_phone: value });
          }
        }}
        className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.user_phone && (
        <p className="text-red-600 text-sm mt-1">{errors.user_phone}</p>
      )}

      {/* City */}
      <input
        placeholder="City"
        value={form.user_city}
        onChange={(e) => updateForm({ user_city: e.target.value })}
        className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.user_city && (
        <p className="text-red-600 text-sm mt-1">{errors.user_city}</p>
      )}

      {/* Password */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={form.user_password}
          onChange={(e) => updateForm({ user_password: e.target.value })}
          className="w-full border border-gray-300 p-3 rounded pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 text-gray-600"
        >
          {showPassword ? (
            <EyeSlashIcon className="w-5 h-5" />
          ) : (
            <EyeIcon className="w-5 h-5" />
          )}
        </button>
        {errors.user_password && (
          <p className="text-red-600 text-sm mt-1">{errors.user_password}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <input
          type={showConfirm ? "text" : "password"}
          placeholder="Confirm Password"
          value={form.confirm_password}
          onChange={(e) => updateForm({ confirm_password: e.target.value })}
          className="w-full border border-gray-300 p-3 rounded pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => setShowConfirm(!showConfirm)}
          className="absolute right-3 top-3 text-gray-600"
        >
          {showConfirm ? (
            <EyeSlashIcon className="w-5 h-5" />
          ) : (
            <EyeIcon className="w-5 h-5" />
          )}
        </button>
        {errors.confirm_password && (
          <p className="text-red-600 text-sm mt-1">{errors.confirm_password}</p>
        )}
      </div>

      {/* Account Type */}
      <select
        value={form.account_type}
        onChange={(e) => updateForm({ account_type: e.target.value })}
        className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Account Type</option>
        <option value="saving">Saving</option>
        <option value="payroll">Payroll</option>
        <option value="deposit">Deposit</option>
      </select>
      {errors.account_type && (
        <p className="text-red-600 text-sm mt-1">{errors.account_type}</p>
      )}

      <div className="flex gap-4">
        <button
          onClick={prevStep}
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
