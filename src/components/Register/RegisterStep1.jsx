import { useRegisterStore } from "../../stores/registerStore";

export default function RegisterStep1() {
  const { form, updateForm, nextStep } = useRegisterStore();

  const isValid =
    form.user_email.includes("@") &&
    form.user_firstname &&
    form.user_lastname &&
    form.user_gender &&
    form.user_birth;

  return (
    <div className="space-y-2">
      <input
        placeholder="Email"
        value={form.user_email}
        onChange={(e) => updateForm({ user_email: e.target.value })}
      />
      <input
        placeholder="First Name"
        value={form.user_firstname}
        onChange={(e) => updateForm({ user_firstname: e.target.value })}
      />
      <input
        placeholder="Last Name"
        value={form.user_lastname}
        onChange={(e) => updateForm({ user_lastname: e.target.value })}
      />
      <select
        value={form.user_gender}
        onChange={(e) => updateForm({ user_gender: e.target.value })}
      >
        <option value="">Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input
        type="date"
        value={form.user_birth}
        onChange={(e) => updateForm({ user_birth: e.target.value })}
      />
      <button
        disabled={!isValid}
        onClick={nextStep}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
