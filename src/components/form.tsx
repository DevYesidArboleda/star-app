"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { z } from "zod";
import { FormDataSchema } from "../../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { VideoStreaming } from "./VideoStreaming";
import { useSteps } from "../hooks/useSteps";
import { usePrevs } from "../hooks/useStepsPrev";
import ReactPlayer from "react-player";
import Image from 'next/image'
import {Select, SelectItem} from "@nextui-org/react";
import Modal from "./Modal";

type Inputs = z.infer<typeof FormDataSchema>;

export const steps = [
  {
    id: "Step 1",
    name: "Personal Information",
    fields: ["firstName", "lastName", "email"],
  },
  {
    id: "Step 2",
    name: "Address",
    fields: ["country", "state", "city", "street", "zip"],
  },
  { id: "Step 3", name: "Complete" },
];

interface typeData {
  name: string;
  description: string;
  price: number;
  tags: string[];
}

export default function Form() {
  const { previousStep, setPreviousStep } = usePrevs();
  const { currentStep, setCurrentStep } = useSteps();
  const [video, setVideo] = useState<JSX.Element | null>(null);
  const [data, setData] = useState<typeData[]>([]);
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState<boolean>(false) 
  const delta = currentStep - previousStep;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    reset();
  };

  type FieldName = keyof Inputs;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://martiolo.xyz/api/products/allProducts"
        );
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        const result = await response.json();
        setData(result.doc);
        setUrl(result.doc[2].videoUrl);
        console.log("respuesta", result);
        console.log("video", result.doc[2].videoUrl);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setVideo(
      <ReactPlayer
        url={`${url}`}
        controls={true}
        height="750px"
        width="464px"
      />
    );
  }, []);

  return (
    <section className="absolute inset-0 flex flex-col justify-between m-8 p-10 ">
      {/* steps */}
      <nav
        aria-label="Progress"
        className="flex items-center w-full justify-center"
      >
        <ol
          role="list"
          className="space-y-0 md:flex w-3/4 TestP [&>*:first-child]:flex-row  [&>*:last-child]:flex-row-reverse"
        >
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-auto ml-0 w-full ">
              {currentStep > index ? (
                <div className="flex flex-row w-full items-center text-[#DCDCDC] after:content-[''] after:w-full after:h-1 after:border-b after:border-[#53545C]  after:border-4 after:inline-block ">
                  <span className="flex items-center justify-center w-10 h-10 bg-[#53545C] rounded-full lg:h-12 lg:w-12  shrink-0">
                    <svg
                      className="w-3.5 h-3.5 text-white lg:w-4 lg:h-4 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                  </span>
                </div>
              ) : currentStep === index ? (
                <div className="flex flex-row w-full items-center text-[#DCDCDC]  after:content-[''] after:w-full after:h-1 after:border-b  after:border-4 after:inline-block after:border-[#DCDCDC]">
                  <span className="flex items-center justify-center w-10 h-10 bg-[#53545C] rounded-full lg:h-12 lg:w-12  shrink-0">
                    <svg
                      className="w-3.5 h-3.5 text-white lg:w-4 lg:h-4 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                  </span>
                </div>
              ) : (
                <div className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b  after:border-[#DCDCDC] after:border-4 after:inline-block text-[#DCDCDC]">
                  <div className="border-[#DCDCDC] border-4  flex items-center justify-center w-10 h-10 bg-transparent rounded-full lg:h-12 lg:w-12  shrink-0"></div>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Form */}
      <form
        className="mt-12 bg-white rounded-md"
        onSubmit={handleSubmit(processForm)}
      >
        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div>
              <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row pr-8">
                <div className="w-auto h-4/5 rounded-md m-8 videoPlayer">
                  {video}
                </div>
                <div className="flex flex-col  h-full gap-12 justify-start items-start">
                  <div className="border-b-2 border-[#8B8C89] w-full">
                    <div className="flex">
                      <h1 className="text-2xl  text-[#53545C] font-bold">
                        Producto
                      </h1>
                      <br />
                      <Image
                        src="/logoStar.svg"
                        width={41}
                        height={41}
                        alt="Logo Star"
                      />
                    </div>                                        
                    <h5 className="mb-2 text-xl font-normal tracking-tight text-black ">
                      {data && data[2]?.name}
                    </h5>
                  </div>
                  <div className="border-b-2 border-[#8B8C89] w-full">
                    <p className="mb-3 font-normal text-black text-xl">
                      Pago contra entrega
                    </p>
                  </div>
                  <div className="border-b-2 border-[#8B8C89] w-full">
                    <p className="mb-3 font-bold text-2xl text-[#53545C] ">
                      Envío gratis
                    </p>
                  </div>
                  <div className="border-b-2 border-[#8B8C89] w-full">
                    <p className="mb-2 text-xl font-normal tracking-tight text-black">
                      Description: {data && data[2]?.description}
                    </p>
                  </div>
                  <div className="border-b-2 border-[#8B8C89] w-full">
                    <h1 className="mb-3 font-bold text-2xl text-[#53545C]">
                      Variaciones
                    </h1>
                    <ul className="flex gap-2">
                      {data.length > 0 &&
                        data[2]?.tags.map((items: any, index: number) => {
                          return (
                            <li
                              key={index}
                              className="mb-2 text-xl font-normal tracking-tight text-black"
                            >
                              {items}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                  <div className="flex w-full justify-center">
                    <button
                      className="btn-success"
                      type="button"
                      onClick={ data[2]?.tags !== null ? ()=>setOpen(true) : next}
                      disabled={data[2]?.tags !== null ? false : currentStep === steps.length - 1}
                      data-ripple-light="true"
                    >
                      Comprar producto
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <h1 className="text-black">Detalles de la compra</h1>
                <div className="pb-3 w-full">
                  <p className="mb-3 font-light text-base text-[#53545C]">Valor total</p>
                  <p className="mb-3 font-semibold text-black text-2xl">{data[2]?.price}</p>
                </div>
                <p className="mb-3 font-light text-base text-[#53545C]">Seleccionar Talla</p>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mb-3">                  
                <Select label="Seleccionar ..." 
                    className="max-w-xs mb-3 font-light text-base text-[#53545C]">
                    {data[2]?.tags.map((items: any, index: number) => {
                          return (
                            <SelectItem className="bg-slate-600 rounded-sm" key={index} value={items}>
                              {items}
                          </SelectItem>
                          );
                        })}
                  </Select>
                </div>
                <div className="pb-3 w-full">
                    <p className="mb-3 font-light text-base text-[#53545C] ">
                      Valor envío
                    </p>
                    <p className="mb-3 font-semibold text-black text-2xl">
                      Gratis
                    </p>
                  </div>
                <button
                  className="btn-success"
                  type="button"
                  onClick={next}
                  disabled={currentStep === steps.length - 1}
                  data-ripple-light="true">
                  Continuar
                </button>
            </Modal>
 
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Address
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    {...register("country")}
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                  {errors.country?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="street"
                    {...register("street")}
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.street?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.street.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="city"
                    {...register("city")}
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.city?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="state"
                    {...register("state")}
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.state?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.state.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="zip"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="zip"
                    {...register("zip")}
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.zip?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.zip.message}
                    </p>
                  )}
                </div>
              M</div>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Complete
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Thank you for your submission.
            </p>
          </>
        )}
      </form>

      {/* Navigation */}
      <div className="mt-8 pt-5">
        <div className="flex justify-between">
          <button
            type="button"
            onClick={prev}
            disabled={currentStep === 0}
            className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            disabled={currentStep === steps.length - 1}
            className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
