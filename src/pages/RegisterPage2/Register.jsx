import RegisterStep1 from "../../components/Register/RegisterStep1";
import RegisterStep2 from "../../components/Register/RegisterStep2";
import RegisterStep3 from "../../components/Register/RegisterStep3";
import { useRegisterStore } from "../../stores/registerStore";

export default function RegisterPage() {
  const { step } = useRegisterStore();
  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Register (Step {step})</h2>
      {step === 1 && <RegisterStep1 />}
      {step === 2 && <RegisterStep2 />}
      {step === 3 && <RegisterStep3 />}
    </div>
  );
}
