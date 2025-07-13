/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React from "react"
// import { AiFillCheckCircle } from "react-icons/ai"
import { useState } from "react"
// import { RadioGroup } from "@headlessui/react"
import { HiCheckCircle } from "react-icons/hi"
import RightContent from "../../components/RightContent"

//progress bar

//step 1 options radio button
const productOptions = [
  { name: "4 GB", inStock: true },
  { name: "8 GB", inStock: true },
  { name: "16 GB", inStock: true },
  { name: "32 GB", inStock: true },
  { name: "64 GB", inStock: true },
  { name: "128 GB", inStock: true },
  { name: "32 GB", inStock: true },
  { name: "64 GB", inStock: true },
  { name: "128 GB", inStock: true },
]

// step 2 options radio button
const categoryOptions = [
  { name: "a", inStock: true },
  { name: "b", inStock: true },
  { name: "c", inStock: true },
  { name: "d", inStock: true },
  { name: "e", inStock: true },
  { name: "f", inStock: true },
  { name: "g", inStock: true },
  { name: "h", inStock: true },
  { name: "i", inStock: true },
  { name: "k", inStock: true },
  { name: "l", inStock: true },
]

// step 3 options radio button
const levelOptions = [
  { name: "x", inStock: true },
  { name: "y", inStock: true },
  { name: "z", inStock: true },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

// const steps = [
//   { name: "Step 1", href: "#", status: "upcoming" },
//   { name: "Step 3", href: "#", status: "upcoming" },
//   { name: "Step 3", href: "#", status: "upcoming" },
// ]

const MultistepButton = ({ currentStep, buttonStep, setStep, label }) => {
  return (
    <li
      key={buttonStep}
      className={classNames(
        buttonStep !== 3 ? "pr-16 sm:pr-24" : "",
        "relative"
      )}
      onClick={() => {
        setStep(buttonStep)
      }}
    >
      {currentStep > buttonStep ? (
        <>
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="h-0.5 w-full bg-gray-200" />
          </div>
          <a
            href="#"
            className="relative flex flex-col items-center justify-center w-20 h-20 bg-white border-none rounded-full border-transparant"
            aria-current="step"
          >
            <span>
              <HiCheckCircle size={24} className="text-[#1C64F2]" />
            </span>
            <span className="sr-only">step {buttonStep}</span>
            <p className="mt-2 text-[#1C64F2] font-medium">{label}</p>
          </a>
        </>
      ) : currentStep === buttonStep ? (
        <>
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            {/* line */}
            <div className="h-0.5 w-full bg-gray-200" />
          </div>
          <a
            href="#"
            className="relative flex flex-col items-center justify-center w-20 h-20 bg-white border-none rounded-full border-transparant"
            aria-current="step"
          >
            <span>
              <HiCheckCircle size={24} className="text-[#1C64F2]" />
            </span>
            <span className="sr-only">step {buttonStep}</span>
            <p className="mt-2 text-[#1C64F2] font-medium">{label}</p>
          </a>
        </>
      ) : (
        <>
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="h-0.5 w-full bg-gray-200" />
          </div>
          <a
            href="#"
            className="relative flex flex-col items-center justify-center w-20 h-20 bg-white border-none rounded-full border-transparant"
          >
            <span>
              <p className="font-medium text-gray-500">{buttonStep}</p>
            </span>
            <span className="sr-only">step {buttonStep} </span>
            <p className="mt-2 font-medium text-gray-500">{label}</p>
          </a>
        </>
      )}
    </li>
  )
}
const FormInput = () => {
  const [step, setStep] = useState(1)
  const [prod, setProd] = useState("")
  const [cat, setCat] = useState("")
  const [level, setLevel] = useState("")

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  return (
    <div className="w-full max-h-full">
      <div className="grid grid-cols-1 bg-white lg:grid-cols-3">
        <RightContent />
        <div className="w-full h-full col-span-2">
          <div className="items-center justify-center w-full">
            {/* <div className="h-full p-6 bg-white rounded-lg shadow-md"> */}
            <div className="h-full p-6 bg-white rounded-lg">
              {/* <ol role="list" className="flex justify-center mx-auto mt-32"> */}
              <ol
                role="list"
                className="flex justify-center px-0 mx-auto mt-32 sm:justify-normal sm:px-12"
              >
                <MultistepButton
                  currentStep={step}
                  buttonStep={1}
                  setStep={setStep}
                  label="Produk"
                />
                <MultistepButton
                  currentStep={step}
                  buttonStep={2}
                  setStep={setStep}
                  label="Kategori"
                />
                <MultistepButton
                  currentStep={step}
                  buttonStep={3}
                  setStep={setStep}
                  label="Level"
                />
              </ol>

              {step === 1 && <Step1 prod={prod} setProd={setProd} />}
              {step === 2 && <Step2 cat={cat} setCat={setCat} />}
              {step === 3 && <Step3 level={level} setLevel={setLevel} />}
              <div className="flex justify-center gap-4 pb-32 mt-8 sm:justify-end sm:mr-16">
                {step > 1 && (
                  <button
                    className="px-8 py-4 text-base leading-4 bg-white border-2 rounded-lg border-cerulean-600 text-cerulean-600 hover:bg-gray-400"
                    onClick={handleBack}
                  >
                    Kembali
                  </button>
                )}
                {step < 3 && (
                  <button
                    className="px-8 py-4 text-base leading-4 text-white rounded-lg bg-cerulean-600 hover:bg-cerulean-600"
                    onClick={handleNext}
                  >
                    Berikutnya
                  </button>
                )}
                {step === 3 && (
                  <button
                    className="px-8 py-4 text-base leading-4 text-white rounded-lg bg-cerulean-600 hover:bg-cerulean-600"
                    onClick={handleNext}
                  >
                    Selesai
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// eslint-disable-next-line react/prop-types
const Step1 = ({ prod, setProd }) => {
  return (
    <div className="w-full h-full col-span-2 p-12 bg-white md:px-16 md:py-4">
      progress bar

      {/* // this is from dev <div className="mt-5 mb-6 text-2xl font-bold text-black" /> */}
      {/* <div className="mt-5 mb-6 text-2xl leading-[30px] font-bold text-cerulean-600">
        Produk training mana yang sesuai dengan rencana anda?
      </div>
      <div className="">
        <RadioGroup value={prod} onChange={setProd} className="mt-2">
          <RadioGroup.Label className="sr-only">
            Choose a memory option
          </RadioGroup.Label>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {productOptions.map((option) => (
              <RadioGroup.Option
                key={option.name}
                value={option}
                className={({ active, checked }) =>
                  classNames(
                    option.inStock
                      ? "cursor-pointer focus:outline-none"
                      : "cursor-not-allowed opacity-20 bg-grey-200 hover:bg-gray-200 hover:text-gray-100 focus:text-gray-500 focus:bg-gray-200",
                    // active ? "ring-2 ring-black ring-offset-2" : "",
                    checked
                      ? "bg-cerulean-600 text-white hover:bg-cerulean-500"
                      : "ring-1 ring-inset ring-gray-200 bg-gray-200 text-gray-900 hover:bg-cerulean-400 hover:text-white",
                    // this is from dev "flex items-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1"
                    // "flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1"
                    "flex rounded-md px-6 py-4 text-[14px] leading-6 font-semibold uppercase sm:flex-1"
                  )
                }
                disabled={!option.inStock}
              >
                <RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div> */}
    </div>
  )
}

// eslint-disable-next-line react/prop-types
const Step2 = ({ cat, setCat }) => {
  return (
    <div className="w-full h-full col-span-2 p-12 bg-white md:px-16 md:py-4">
      progress bar

      {/* // this is from dev <div className="mt-5 mb-6 text-2xl font-bold text-black" /> */}
      {/* <div className="mb-6 text-2xl font-bold text-cerulean-600">
        Kategori seperti apa yang sesuai dengan rencana anda?{" "}
      </div>
      <div className="">
        <RadioGroup value={cat} onChange={setCat} className="mt-2">
          <RadioGroup.Label className="sr-only">
            Choose a memory option
          </RadioGroup.Label>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {categoryOptions.map((option) => (
              <RadioGroup.Option
                key={option.name}
                value={option}
                className={({ active, checked }) =>
                  classNames(
                    option.inStock
                      ? "cursor-pointer focus:outline-none"
                      : "cursor-not-allowed opacity-25",
                    // active ? "ring-2 ring-cerulean-600 ring-offset-2" : "",
                    checked
                      ? "bg-cerulean-600 text-white hover:bg-cerulean-500"
                      : "ring-1 ring-inset ring-gray-200 bg-gray-200 text-gray-900 hover:bg-cerulean-400 hover:text-white",
                    // this is from dev "flex items-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1"
                    // "flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1"
                    "flex rounded-md px-6 py-4 text-[14px] leading-6 font-semibold uppercase sm:flex-1"
                  )
                }
                disabled={!option.inStock}
              >
                <RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div> */}
    </div>
  )
}

// eslint-disable-next-line react/prop-types
const Step3 = ({ level, setLevel }) => {
  return (
    <div className="w-full h-full col-span-2 p-12 bg-white md:px-16 md:py-4">
      progress bar

      {/* // this is from dev <div className="mt-5 mb-6 text-2xl font-bold text-black"> */}
      {/* <div className="mb-6 text-2xl font-bold text-cerulean-600">
        Level training seperti apa yang ingin anda dapatkan?{" "}
      </div>
      <div className="">
        <RadioGroup value={level} onChange={setLevel} className="mt-2">
          <RadioGroup.Label className="sr-only">
            Choose a memory option
          </RadioGroup.Label>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {levelOptions.map((option) => (
              <RadioGroup.Option
                key={option.name}
                value={option}
                className={({ active, checked }) =>
                  classNames(
                    option.inStock
                      ? "cursor-pointer focus:outline-none"
                      : "cursor-not-allowed opacity-25",
                    // active ? "ring-2 ring-cerulean-600 ring-offset-2" : "",
                    checked
                      ? "bg-cerulean-600 text-white hover:bg-cerulean-500"
                      : "ring-1 ring-inset ring-gray-200 bg-gray-200 text-gray-900 hover:bg-cerulean-400 hover:text-white",
                    // this is from dev "flex items-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1"
                    // "flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1"
                    "flex rounded-md px-6 py-4 text-[14px] leading-6 font-semibold uppercase sm:flex-1"
                  )
                }
                disabled={!option.inStock}
              >
                <RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div> */}
    </div>
  )
}

export default FormInput
