import { useNavigate } from "react-router-dom";
import { useRegisterStore } from "../../stores/registerStore";

export default function RegisterStep1() {
  const { form, updateForm, nextStep } = useRegisterStore();
  const navigate = useNavigate();

  const isValid =
    form.user_email.includes("@") &&
    form.user_firstname &&
    form.user_lastname &&
    form.user_gender &&
    form.user_birth;

  return (
    <div className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={form.user_email}
        onChange={(e) => updateForm({ user_email: e.target.value })}
        className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        placeholder="First Name"
        value={form.user_firstname}
        onChange={(e) => updateForm({ user_firstname: e.target.value })}
        className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        placeholder="Last Name"
        value={form.user_lastname}
        onChange={(e) => updateForm({ user_lastname: e.target.value })}
        className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={form.user_gender}
        onChange={(e) => updateForm({ user_gender: e.target.value })}
        className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input
        type="date"
        value={form.user_birth}
        onChange={(e) => updateForm({ user_birth: e.target.value })}
        className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
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
