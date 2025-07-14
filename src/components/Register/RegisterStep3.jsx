import { useAuth } from "../../context/useAuth";
import { useRegisterStore } from "../../stores/registerStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAccount } from "../../context/useAccount";

export function RegisterStep3() {
  const { form, prevStep, reset } = useRegisterStore();
  const { register } = useAuth();
  const { addAccount } = useAccount();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const summaryFields = [
    { key: "user_email", label: "Email" },
    { key: "user_firstname", label: "First Name" },
    { key: "user_lastname", label: "Last Name" },
    { key: "user_gender", label: "Gender" },
    { key: "user_birth", label: "Birth Date" },
    { key: "user_phone", label: "Phone" },
    { key: "user_city", label: "City" },
    // { key: "user_password", label: "Password" },
    // { key: "confirm_password", label: "Confirm Password" },
    { key: "account_type", label: "Account Type" },
    { key: "account_balance", label: "Initial Balance" },
  ];

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // 1. Register user
      const user = await register({
        user_email: form.user_email,
        user_password: form.user_password,
        user_firstname: form.user_firstname,
        user_lastname: form.user_lastname,
        user_gender: form.user_gender,
        user_birth: form.user_birth,
        user_phone: form.user_phone,
        user_city: form.user_city,
        account_balance: 300000,
      });

      // 2. Register account
      await addAccount({
        user_id: user.id,
        account_type: form.account_type,
        account_balance: 300000,
      });

      alert("Register success!");
      reset(); // <-- Reset form & localStorage!
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Register failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Summary</h3>

      <div className="bg-gray-100 border border-gray-300 p-4 rounded text-sm max-h-72 overflow-auto space-y-2">
          {/* Email */} 
        <div className="grid grid-cols-2 gap-x-4">
              <div className="font-semibold text-gray-700">Email</div>   
          <div className="text-gray-900">{form.user_email || "-"}</div> 
        </div>
          {/* Password */} 
        <div className="grid grid-cols-2 gap-x-4">
              <div className="font-semibold text-gray-700">Password</div>   
          <div className="text-gray-900">{form.user_password || "-"}</div> 
        </div>
          {/* First Name */} 
        <div className="grid grid-cols-2 gap-x-4">
              <div className="font-semibold text-gray-700">First Name</div>   
          <div className="text-gray-900">{form.user_firstname || "-"}</div> 
        </div>
          {/* Last Name */} 
        <div className="grid grid-cols-2 gap-x-4">
              <div className="font-semibold text-gray-700">Last Name</div>   
          <div className="text-gray-900">{form.user_lastname || "-"}</div> 
        </div>
          {/* Gender */} 
        <div className="grid grid-cols-2 gap-x-4">
              <div className="font-semibold text-gray-700">Gender</div>   
          <div className="text-gray-900">{form.user_gender || "-"}</div> 
        </div>
          {/* Tanggal Lahir */} 
        <div className="grid grid-cols-2 gap-x-4">
              <div className="font-semibold text-gray-700">Tanggal Lahir</div> 
            <div className="text-gray-900">{form.user_birth || "-"}</div> 
        </div>
          {/* Nomor Telepon */} 
        <div className="grid grid-cols-2 gap-x-4">
              <div className="font-semibold text-gray-700">Nomor Telepon</div> 
            <div className="text-gray-900">{form.user_phone || "-"}</div> 
        </div>
          {/* Kota */} 
        <div className="grid grid-cols-2 gap-x-4">
              <div className="font-semibold text-gray-700">Kota</div>   
          <div className="text-gray-900">{form.user_city || "-"}</div> 
        </div>
          {/* Tipe Akun */} 
        <div className="grid grid-cols-2 gap-x-4">
              <div className="font-semibold text-gray-700">Tipe Akun</div>   
          <div className="text-gray-900">{form.account_type || "-"}</div> 
        </div>
          {/* Saldo Akun */} 
        <div className="grid grid-cols-2 gap-x-4">
              <div className="font-semibold text-gray-700">Saldo Awal</div>   
          <div className="text-gray-900">{form.account_balance || "-"}</div> 
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={prevStep}
          disabled={loading}
          className="flex-1 bg-gray-300 text-gray-800 py-3 rounded hover:bg-gray-400 transition"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 bg-green-600 text-white py-3 rounded hover:bg-green-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </div>
  );
}
