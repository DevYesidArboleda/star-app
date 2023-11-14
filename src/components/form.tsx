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
import {Select, SelectItem} from "@nextui-org/react";
import Modal from "./Modal";
import Steps  from "./Steps";
import { AddressProduct } from "./AddressProduct";
import ReactPlayer from "react-player";

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
  const [variation, setVaration] = useState("");
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
        setVideo(
          <ReactPlayer
            url={result.doc[2].videoUrl}
            controls={true}
            height="750px"
            width="464px"
          />
        );
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="bg-[#E7ECEF] h-scTestP inset-0 flex flex-col justify-between p-14 ">

      <Steps currentStep={currentStep} />

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
            
            <VideoStreaming setOpen={setOpen} data={data} video={video}/>

            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <div className="">
                  <h1 className="w-full flex justify-center mb-4 text-black text-xl">Detalles de la compra</h1>
                  <div className="pb-3 w-full">
                    <p className="mb-3 font-light text-base text-[#53545C]">Valor total</p>
                    <p className="mb-3 font-semibold text-black text-2xl">{data[2]?.price}</p>
                  </div>
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mb-3">                  
                  <Select label="Seleccionar ..." 
                      className="max-w-xs mb-3 font-light text-base text-[#53545C]">
                      {data[2]?.tags.map((items: any, index: number) => {
                            return (
                              <SelectItem className="text-black" key={index} value={items} onClick={() => setVaration(items)}>
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
                    className="btn-success flex w-full items-center text-center justify-center"
                    type="button"
                    onClick={next}
                    disabled={currentStep === steps.length - 1}
                    data-ripple-light="true">
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
            
            <AddressProduct variation={ variation }/>

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
