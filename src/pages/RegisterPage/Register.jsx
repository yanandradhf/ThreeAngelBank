import { Link } from "react-router-dom";
import RegisterStep1 from "../../components/Register/RegisterStep1";
import RegisterStep2 from "../../components/Register/RegisterStep2";
import RegisterStep3 from "../../components/Register/RegisterStep3";
import { useRegisterStore } from "../../stores/registerStore";

export default function RegisterPage() {
  const { step } = useRegisterStore();

  const progressPercent = (step / 3) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Register (Step {step})
        </h2>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <div className="space-y-4">
          {step === 1 && <RegisterStep1 />}
          {step === 2 && <RegisterStep2 />}
          {step === 3 && <RegisterStep3 />}
        </div>
      </div>

      {/* Tombol Back */}
      <Link
        to="/login"
        className="mt-6 text-white underline hover:text-blue-100 transition"
      >
        &larr; Back to Login
      </Link>
    </div>
  );
}
