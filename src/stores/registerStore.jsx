import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useRegisterStore = create(
  persist(
    (set, get) => ({
      // Isi state form defaul
      //t
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
      // Bisa custom storage: sessionStorage juga bisa, default localStorage
    }
  )
);



// import { create } from "zustand";

// export const useRegisterStore = create((set) => ({
//   step: 1,
//   form: {
//     user_email: "",
//     user_password: "",
//     confirm_password: "",
//     user_firstname: "",
//     user_lastname: "",
//     user_gender: "",
//     user_birth: "",
//     user_phone: "",
//     user_city: "",
//     account_type: "saving",
//     account_balance: 0,
//   },
//   nextStep: () => set((state) => ({ step: state.step + 1 })),
//   prevStep: () => set((state) => ({ step: state.step - 1 })),
//   updateForm: (newData) =>
//     set((state) => ({ form: { ...state.form, ...newData } })),
// }));
