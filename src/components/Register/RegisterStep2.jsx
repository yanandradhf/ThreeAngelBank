import { useRegisterStore } from "../../stores/registerStore";

export default function RegisterStep2() {
  const { form, updateForm, nextStep, prevStep } = useRegisterStore();
  const isValid =
    form.user_phone &&
    form.user_city &&
    form.user_password.length >= 8 &&
    form.user_password === form.confirm_password &&
    form.account_type;

  return (
    <div className="space-y-4">
      <input
        placeholder="Phone"
        value={form.user_phone}
        onChange={(e) => updateForm({ user_phone: e.target.value })}
        className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        placeholder="City"
        value={form.user_city}
        onChange={(e) => updateForm({ user_city: e.target.value })}
        className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        placeholder="Password"
        type="password"
        value={form.user_password}
        onChange={(e) => updateForm({ user_password: e.target.value })}
        className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        placeholder="Confirm Password"
        type="password"
        value={form.confirm_password}
        onChange={(e) => updateForm({ confirm_password: e.target.value })}
        className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
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

      <div className="flex gap-4">
        <button
          onClick={prevStep}
          className="flex-1 bg-gray-300 text-gray-800 py-3 rounded hover:bg-gray-400 transition"
        >
          Back
        </button>
        <button
          disabled={!isValid}
          onClick={nextStep}
          className="flex-1 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
