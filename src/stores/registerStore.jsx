import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useRegisterStore = create(
  persist(
    (set, get) => ({
      // Isi state form default
      form: {
        user_email: "",
        user_firstname: "",
        user_lastname: "",
        user_gender: "",
        user_birth: "",
        user_phone: "",
        user_city: "",
        user_password: "",
        confirm_password: "",
        account_type: "",
        account_balance: 0,
      },
      step: 1,

      // Update sebagian form
      updateForm: (payload) =>
        set((state) => ({
          form: { ...state.form, ...payload },
        })),

      // Navigasi step
      nextStep: () => set((state) => ({ step: state.step + 1 })),
      prevStep: () => set((state) => ({ step: state.step - 1 })),

      // Reset form & step (panggil saat register selesai/success)
      reset: () =>
        set({
          form: {
            user_email: "",
            user_firstname: "",
            user_lastname: "",
            user_gender: "",
            user_birth: "",
            user_phone: "",
            user_city: "",
            user_password: "",
            confirm_password: "",
            account_type: "",
            account_balance: 0,
          },
          step: 1,
        }),
    }),
    {
      name: "register-storage", // nama key di localStorage
    }
  )
);

