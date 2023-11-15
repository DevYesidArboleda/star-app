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
import { Select, SelectItem } from "@nextui-org/react";
import Modal from "./Modal";
import Steps from "./Steps";
import { AddressProduct } from "./AddressProduct";
import Image from "next/image";
import ReactPlayer from "react-player";
import { CompletePay } from "./CompletePay";
import { UseWindowSize } from "@/hooks/UseWindowSize";

type Inputs = z.infer<typeof FormDataSchema>;

export const steps = [
  {
    id: "Step 1",
    name: "Personal Information",
    fields: ["firstName", "lastName"],
  },
  {
    id: "Step 2",
    name: "Address",
    fields: ["city", "street", "date", "phone", "name", "email"],
  },
  { id: "Step 3", name: "Complete" },
  { id: "Step 4", name: "RegisterStar" },
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
  const [variation, setVaration] = useState("");
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);
  const delta = currentStep - previousStep;
  const windowSize = UseWindowSize();

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
        setVideo(
          <ReactPlayer
            url={result.doc[2].videoUrl}
            controls={true}
            width="100%"
            height="100%"
            playing={true}
          />
        );
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="bg-transparent h-scTestP inset-0 flex flex-col justify-between p-14 ">
      <Steps currentStep={currentStep} />

      {/* Form */}
      <form
        className="mt-12 bg-transparent rounded-md flex justify-center"
        onSubmit={handleSubmit(processForm)}
      >
        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <VideoStreaming setOpen={setOpen} data={data} video={video} />

            <Modal isOpen={open} onClose={() => setOpen(false)}>
              <div className="">
                <h1 className="w-full flex justify-center mb-4 text-black text-xl">
                  Detalles de la compra
                </h1>
                <div className="flex flex-col pb-3 w-full">
                  <span className="mb-3 font-light text-base text-[#53545C]">
                    Valor total
                  </span>
                  <span className="mb-3 font-semibold text-black text-2xl">
                    {data[2]?.price}
                  </span>
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mb-3">
                  <Select
                    label="Seleccionar ..."
                    className="max-w-xs mb-3 font-light text-base text-[#53545C]"
                  >
                    {data[2]?.tags.map((items: any, index: number) => {
                      return (
                        <SelectItem
                          className="text-black"
                          key={index}
                          value={items}
                          onClick={() => setVaration(items)}
                        >
                          {items}
                        </SelectItem>
                      );
                    })}
                  </Select>
                </div>
                <div className="flex flex-col pb-3 w-full">
                  <span className="mb-3 font-light text-base text-[#53545C] ">
                    Valor envío
                  </span>
                  <span className="mb-3 font-semibold text-black text-2xl">
                    Gratis
                  </span>
                </div>
                <button
                  className="btn-success flex w-full items-center text-center justify-center"
                  type="button"
                  onClick={next}
                  disabled={currentStep === steps.length - 1}
                  data-ripple-light="true"
                >
                  Continuar
                </button>
              </div>
            </Modal>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex flex-row justify-between">
              <div className="px-[16.5px] py-[49.5px] w-1/4 bg-Form">
                <h2 className=" leading-7  text-black text-xl font-medium text-center mb-5">
                  Hacer Pedido
                </h2>
                <span className="mt-1 text-base font-medium leading-6 text-[#8B8D97]">
                  Ingresa tus datos
                </span>

                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <div className="mt-2">
                      <input
                        type="text"
                        id="name"
                        {...register("name")}
                        placeholder="Nombre completo"
                        className="bg-Form-input "
                      />
                      {errors.name?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-span-full">
                    <div className="mt-1">
                      <input
                        type="number"
                        id="phone"
                        {...register("phone")}
                        placeholder="Telefono"
                        className="bg-Form-input "
                      />
                      {errors.phone?.message && (
                        <span className="mt-2 text-sm text-red-400">
                          {errors.phone.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-span-full">
                    <div className="mt-2">
                      <input
                        type="email"
                        id="email"
                        {...register("email")}
                        placeholder="Correo Electrónico"
                        className="bg-Form-input "
                      />
                      {errors.email?.message && (
                        <span className="mt-2 text-sm text-red-400">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-span-full">
                    <div className="mt-2">
                      <input
                        type="text"
                        id="street"
                        {...register("street")}
                        autoComplete="street-address"
                        placeholder="Dirección"
                        className="bg-Form-input "
                      />
                      {errors.street?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.street.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Ciudad
                    </label>
                    <div className="mt-2">
                      <select
                        id="city"
                        {...register("city")}
                        autoComplete="city-name"
                        placeholder="Ciudad"
                        className="bg-Form-input "
                      >
                        <option>Cali</option>
                        <option>Bogota</option>
                        <option>Medellin</option>
                      </select>
                      {errors.city?.message && (
                        <span className="mt-2 text-sm text-red-400">
                          {errors.city.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="city"
                      className="text-[10px] block text-sm font-medium leading-6 text-gray-900"
                    >
                      Fecha de entrega aproximada
                    </label>
                    <div className="mt-2">
                      <input
                        type="date"
                        id="date"
                        {...register("date")}
                        className="bg-Form-input "
                      />
                      {errors.date?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.date.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="city"
                      className="block text-[10px] font-medium leading-6 text-gray-900"
                    >
                      Notas adicionales
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="note"
                        placeholder="Notas o información adicional"
                        className="bg-Form-input "
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-2 w-[72%]">
                <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg justify-evenly shadow md:flex-row pr-8">
                  <div className="w-[464px] h-4/5 rounded-md m-8 videoPlayer">
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
                          priority={true}
                        />
                      </div>
                      <h5 className="mb-2 text-xl font-normal tracking-tight text-black ">
                        {data && data[2]?.name}
                      </h5>
                    </div>
                    <div className="border-b-2 border-[#8B8C89] w-full">
                      <span className=" flex flex-col mb-3 font-bold text-2xl text-[#53545C] ">
                        Valor del producto
                      </span>
                      <span className="mb-3 font-normal text-black text-xl">
                        {data && data[2]?.price}
                      </span>
                    </div>
                    <div className="border-b-2 border-[#8B8C89] w-full">
                      <span className=" flex flex-col mb-3 font-bold text-2xl text-[#53545C] ">
                        Valor del envío
                      </span>
                      <span className="mb-3 font-light text-xl text-black ">
                        Gratis
                      </span>
                    </div>
                    <div className="border-b-2 border-[#8B8C89] w-full">
                      <h1 className="mb-3 font-bold text-2xl text-[#53545C]">
                        Detalles
                      </h1>
                      <span className="text-black font-light text-xl">
                        Variaciones: {variation}
                      </span>
                    </div>
                    <div className="flex w-full justify-center">
                      <button
                        className="btn-success"
                        type="button"
                        onClick={next}
                        disabled={currentStep === steps.length - 1}
                        data-ripple-light="true"
                      >
                        Finalizar Compra
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <>
            <CompletePay setStart={setStart}/>
          </>
        )}

        {start === true && (
          <>
            Hola
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
