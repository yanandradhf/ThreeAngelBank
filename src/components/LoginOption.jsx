import { FcGoogle } from "react-icons/fc"

const LoginOption = () => {
  return (
    <div className="flex flex-row gap-5 justify-center">
      <button type="button" className="bg-white border-[1px] border-slate-300 rounded-lg w-full h-12 flex justify-center content-center items-center gap-2">
        <FcGoogle size={18} className="" />
        <span className="font-inter font-medium leading-5 text-base text-gray-800">
          Masuk dengan Google
        </span>
      </button>
    </div>
  )
}

export default LoginOption
