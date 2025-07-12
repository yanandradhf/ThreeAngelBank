/* eslint-disable no-useless-escape */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-undef */

// import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { HiEye, HiEyeOff } from "react-icons/hi"
import LoginOption from "../../components/LoginOption"

const FormInput = () => {
  const [password, setPassword] = useState("")
  const [passwordType, setPasswordType] = useState("password")

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const togglePasswordVisible = () => {
    if (passwordType === "text") {
      setPasswordType("text")
      return
    } else {
      setPasswordType("password")
    }
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const onSubmit = (data) => console.log(data)

  return (
    // <div className="flex w-screen sm:w-[576px] px-8 py-8 flex-col justify-center gap-[23px]">
    <div className="flex flex-col justify-center w-screen p-8 lg:w-3/4 gap-[23px]">
      <h1 className="font-sans text-xl font-bold leading-tight">
        Selamat Datang
      </h1>
      {/* container form input */}

      <form
        className="flex flex-col gap-[23px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-5">
          {/* form input pertama */}
          <div className="flex flex-col items-start gap-2">
            <label className="font-sans text-sm font-medium leading-[21px] text-gray-900">
              Email
            </label>
            <input
              {...register("email", {
                requiblue: "Email harus diisi",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Masukan format email dengan benar",
                },
              })}
              id="email"
              type="email"
              placeholder="Email"
              className="flex px-4 py-3 gap-[10px] h-[42px] rounded-lg border-gray-300 bg-gray-50 w-full focus:outline-none"
            />
            {errors.email && (
              <>
                <div className="flex flex-row items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    fill="none"
                    viewBox="0 0 11 12"
                  >
                    <path
                      fill="#E02424"
                      fillRule="evenodd"
                      d="M2.361 2.861a.55.55 0 01.778 0L5.5 5.222l2.361-2.36a.55.55 0 11.778.777L6.278 6l2.36 2.361a.55.55 0 01-.777.778l-2.36-2.361-2.362 2.361a.55.55 0 01-.778-.778l2.361-2.36-2.36-2.362a.55.55 0 010-.778z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p className="text-[#E02222] font-sans text-xs font-normal leading-[18px]">
                    {errors.email.message}
                  </p>
                </div>
              </>
            )}
          </div>
          {/* form input kedua */}
          <div className="flex flex-col items-start gap-2">
            <label className="font-sans text-sm font-medium leading-[21px] text-gray-900">
              Password
            </label>
            <div className="relative flex flex-row w-full">
              <input
                {...register("password", {
                  requiblue: "Password harus diisi",
                  pattern: {
                    value:
                      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                    message:
                      "Password harus berisi minimal 1 angka, 1 spesial karakter, angka sepanjang 6 - 16 karakter",
                  },
                  minLength: {
                    value: 8,
                    message: "Panjang password minimal 8 huruf",
                  },
                })}
                id="password"
                type={passwordType}
                onChange={handlePasswordChange}
                value={password}
                placeholder="••••••••••"
                className="flex px-4 py-3 h-[42px] gap-[10px] rounded-lg border-gray-300 bg-gray-50 w-full focus:outline-none"
              />
              <div className="absolute top-3 right-2">
                <button onClick={togglePasswordVisible}>
                  {passwordType === "password" ? (
                    <HiEyeOff size={18} color="#8E95A2" />
                  ) : (
                    <HiEye size={18} color="#8E95A2" />
                  )}
                </button>
              </div>
            </div>
            {errors.password && (
              <>
                <div className="flex flex-row items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="none"
                    viewBox="0 0 11 12"
                  >
                    <path
                      fill="#E02424"
                      fillRule="evenodd"
                      d="M2.361 2.861a.55.55 0 01.778 0L5.5 5.222l2.361-2.36a.55.55 0 11.778.777L6.278 6l2.36 2.361a.55.55 0 01-.777.778l-2.36-2.361-2.362 2.361a.55.55 0 01-.778-.778l2.361-2.36-2.36-2.362a.55.55 0 010-.778z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p className="text-[#E02222] font-sans text-xs font-normal leading-[18px]">
                    {errors.password.message}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 border-gray-300 rounded bg-gray-50"
            />
            <span className="font-sans text-xs font-medium leading-[18px] text-gray-600">
              Ingat saya
            </span>
          </div>
          <div className="flex">
            {/* <Link
              to="/forgot-password"
              className="text-blue-600 text-xs font-medium leading-[18px]"
            >
              Lupa Password?
            </Link> */}
          </div>
        </div>

        <div className="flex gap-[10px]">
          <button
            type="submit"
            className="w-full px-8 py-4 font-sans text-base font-medium leading-4 text-center text-white rounded-md cursor-pointer hover:bg-blue-700 bg-blue-600"
          >
            Masuk
          </button>
        </div>
        <span className="text-sm text-center font-sans font-normal text-gray-500">
          Belum punya akun?{" "}
          <button
            className="font-sans text-sm font-normal leading-[21px] text-blue-600"
            to="/sign-up"
          >
            Daftar Sekarang
          </button>
        </span>
        {/* <div className="text-gray-500 text-base font-medium text-center">
          atau
        </div>
        <LoginOption /> */}
      </form>
    </div>
  )
}

export default FormInput
