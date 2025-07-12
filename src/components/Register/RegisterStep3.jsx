import { useAuth } from "../../hooks/useAuth";
import { useRegisterStore } from "../../stores/registerStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAccount } from "../../hooks/useAccount";

export default function RegisterStep3() {
  const { form, prevStep } = useRegisterStore();
  const { register } = useAuth();
  const { addAccount } = useAccount();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
      });

      // 2. Register account
      await addAccount({
        user_id: user.id,
        account_type: form.account_type,
        account_balance: form.account_balance,
      });

      alert("Register success!");
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

      <pre className="bg-gray-100 border border-gray-300 p-4 rounded text-sm max-h-72 overflow-auto">
        {JSON.stringify(form, null, 2)}
      </pre>

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
