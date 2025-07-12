import { useAuth } from "../../hooks/useAuth";
import { useTransaction } from "../../hooks/useTransaction";
import { useRegisterStore } from "../../stores/registerStore";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function RegisterStep3() {
  const { form, prevStep } = useRegisterStore();
  const { register } = useAuth();
  const { addAccount } = useTransaction();
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
    <div className="space-y-2">
      <h3 className="font-bold">Summary</h3>
      <pre className="bg-gray-100 p-4 rounded text-sm max-h-72 overflow-auto">
        {JSON.stringify(form, null, 2)}
      </pre>
      <div className="flex gap-2">
        <button onClick={prevStep} disabled={loading}>
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </div>
  );
}
