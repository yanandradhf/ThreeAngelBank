import { create } from "zustand";

export const useRegisterStore = create((set) => ({
  step: 1,
  form: {
    user_email: "",
    user_password: "",
    confirm_password: "",
    user_firstname: "",
    user_lastname: "",
    user_gender: "",
    user_birth: "",
    user_phone: "",
    user_city: "",
    account_type: "saving",
    account_balance: 0,
  },
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),
  updateForm: (newData) =>
    set((state) => ({ form: { ...state.form, ...newData } })),
}));
