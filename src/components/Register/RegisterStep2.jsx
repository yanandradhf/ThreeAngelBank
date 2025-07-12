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
    <div className="space-y-2">
      <input
        placeholder="Phone"
        value={form.user_phone}
        onChange={(e) => updateForm({ user_phone: e.target.value })}
      />
      <input
        placeholder="City"
        value={form.user_city}
        onChange={(e) => updateForm({ user_city: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        value={form.user_password}
        onChange={(e) => updateForm({ user_password: e.target.value })}
      />
      <input
        placeholder="Confirm Password"
        type="password"
        value={form.confirm_password}
        onChange={(e) => updateForm({ confirm_password: e.target.value })}
      />
      <select
        value={form.account_type}
        onChange={(e) => updateForm({ account_type: e.target.value })}
      >
        <option value="saving">Saving</option>
        <option value="payroll">Payroll</option>
        <option value="deposit">Deposit</option>
      </select>
      <div className="flex gap-2">
        <button onClick={prevStep}>Back</button>
        <button
          disabled={!isValid}
          onClick={nextStep}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
