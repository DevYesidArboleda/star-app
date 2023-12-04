"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { FormDataSchema } from "../../../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { VideoStreaming } from "./VideoStreaming";
import { useSteps } from "../../hooks/useSteps";
import { usePrevs } from "../../hooks/useStepsPrev";
import { Select, SelectItem } from "@nextui-org/react";
import Modal from "./Modal";
import Steps from "./Steps";
import { AddressProduct } from "./AddressProduct";
import Image from "next/image";
import ReactPlayer from "react-player";
import { CompletePay } from "./CompletePay";
import { UseWindowSize } from "@/hooks/UseWindowSize";
import FormMobile from "./FormMobile";
import { Data, Doc } from "../../../interfaces";
import { useSearchParams } from 'next/navigation'
import { dataApi } from "../../../api";

type Inputs = z.infer<typeof FormDataSchema>;

export const steps = [
  {
    id: "Step 1",
    name: "Product Information",
    fields: ["firstName", "lastName"],
  },
  {
    id: "Step 2",
    name: "Address",
    fields: ["city", "street", "date", "phone", "name", "email"],
  },
  { id: "Step 3", name: "Complete" },
];

interface typeData {
  name: string;
  description: string;
  price: number;
  tags: string[];
}

export default function Form(dataFinal: any) {
  const { previousStep, setPreviousStep } = usePrevs();
  const { currentStep, setCurrentStep } = useSteps();
  const [video, setVideo] = useState<JSX.Element | null>(null);
  const [data, setData] = useState<any>([]);
  const [department, setDepartment] = useState<any>([]);
  const [city, setCity] = useState<any>([]);
  const [cityid, setCityid] = useState();
  const [finalData, setFinalData] = useState<any>([]);
  const [variation, setVaration] = useState("");
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const delta = currentStep - previousStep;
  const windowSize = UseWindowSize();
  const searchParams = useSearchParams() 
  const search = searchParams.get('productID')

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
    /*const fetchData = async () => {
      const { data } = await dataApi.get<Data>("/products/allProducts");
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
    };*/      

    const fetchData = async () => {
      const final:any = dataFinal.data.filter((task:any) => task._id === search)  
      final.forEach((element:any)=> {
        setFinalData(element)
      });     
    }    
    console.log("asa", finalData)

    fetchData();
  }, [dataFinal]);

  useEffect(() => {
    setData(finalData);
    setUrl(finalData.videoUrl);
    setVideo(
      <ReactPlayer
        url={finalData.videoUrl}
        controls={true}
        width="100%"
        height="100%"
        playing={true}
      />
    );
  }, [finalData])

  useEffect(() => {     

    const fetchDeparment = async () => {
      const {data} = await dataApi.get<any>("/localities/departments");
      console.log("deparment", data.departments)
      setDepartment(data.departments)
    }    

    fetchDeparment();
  }, []);

  const handleInputDeparment= (e:any)=>{
    let index = e.target.selectedIndex;
    setCityid(e.target.options[index].value)
    console.log("valor depar",e.target.options[index].value); // obtiene el texto de la opción seleccionada
  }

  useEffect(() => {     

    const fetchCity = async () => {
      const {data} = await dataApi.get<any>(`/localities/cities-by-department/${cityid}`);
      console.log("city", data)
      setCity(data.cities)
    }    

    fetchCity();
  }, [cityid]);
  

  return (
    <>
      {windowSize.width >= 768 ? (
        <section
          className="bg-transparent h-scTestP inset-0 flex flex-col justify-between xl:p-14 md:p-4 items-center"
          suppressHydrationWarning={true}
        >
          <Steps currentStep={currentStep} />

          {/* Form */}
          <form
            className="mt-12 bg-transparent rounded-md flex justify-center w-full"
            onSubmit={handleSubmit(processForm)}
          >
            {currentStep === 0 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full"
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
                        {data.price}
                      </span>
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mb-3">
                      <Select
                        label="Seleccionar ..."
                        className="max-w-xs mb-3 font-light text-base text-[#53545C]"
                      >
                        {data.tags?.map((items: any, index: number) => {
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
                className="w-full"
              >
                <div className="flex lg:flex-row justify-between flex-row-reverse">
                  <div className="px-[16.5px] py-[49.5px] lg:w-1/4 bg-Form w-[57%]">
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
                            placeholder="Nombres"
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
                        <div className="mt-2">
                          <input
                            type="text"
                            id="name"
                            {...register("lastname")}
                            placeholder="Apellidos"
                            className="bg-Form-input "
                          />
                          {errors.lastname?.message && (
                            <p className="mt-2 text-sm text-red-400">
                              {errors.lastname.message}
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
                            className="bg-Form-input"
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

                      <div className="xl:col-span-full sm:col-span-3">                        
                        <div className="mt-2">
                          <select
                            id="department"
                            {...register("department")}
                            autoComplete=""
                            placeholder="Departamento"
                            className="bg-Form-input "
                            onChange={handleInputDeparment}
                          >Departamento
                            {department.length > 0 &&
                              department.map((items: any, index: number) => {                    
                                return (                                  
                                  <option key={index} value={items.dropi_id}>{items.name}</option>                                  
                                );
                              })}
                          </select>
                          {errors.department?.message && (
                            <span className="mt-2 text-sm text-red-400">
                              {errors.department.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="xl:col-span-full sm:col-span-3">                        
                        <div className="mt-2">
                          <select
                            id="city"
                            {...register("city")}
                            autoComplete=""
                            placeholder="Ciudad"
                            className="bg-Form-input "
                          >Ciudad
                            {city.length > 0 &&
                              city.map((items: any, index: number) => {                    
                                return (                                  
                                  <option key={index} value={items.dropi_id}>{items.name}</option>                                  
                                );
                              })}
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
                    <div className="flex w-full lg:hidden pt-8 items-center justify-center">
                      <button
                        className="btn-success md:w-full"
                        type="button"
                        onClick={next}
                        disabled={currentStep === steps.length - 1}
                        data-ripple-light="true"
                      >
                        Finalizar Compra
                      </button>
                    </div>
                  </div>

                  <div className=" lg:w-[74%] w-5/12">
                    <div className="flex flex-col fle items-center bg-white border border-gray-200 rounded-lg justify-start max-w-[936px] shadow lg:flex-row pr-4 lg:pr-2 lg:py-2 md:pr-1 md:py-2 py-2">
                      <div className="lg:w-[380px] h-4/5 rounded-md m-8 videoPlayer w-10/12">
                        {video}
                      </div>
                      <div className="flex flex-col  h-full gap-12 justify-start items-start w-full md:max-w-[200px] xl:max-w-[375px] ">
                        <div className="border-b-2 border-[#D9D9D9] w-full">
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
                            {data && data.name}
                          </h5>
                        </div>
                        <div className="border-b-2 border-[#D9D9D9] w-full">
                          <span className=" flex flex-col mb-3 font-bold text-2xl text-[#53545C] ">
                            Valor del producto
                          </span>
                          <span className="mb-3 font-normal text-black text-xl">
                            {data && data.price}
                          </span>
                        </div>
                        <div className="border-b-2 border-[#D9D9D9] w-full">
                          <span className=" flex flex-col mb-3 font-bold text-2xl text-[#53545C] ">
                            Valor del envío
                          </span>
                          <span className="mb-3 font-light text-xl text-black ">
                            Gratis
                          </span>
                        </div>
                        <div className="border-b-2 border-[#D9D9D9] w-full">
                          <h1 className="mb-3 font-bold text-2xl text-[#53545C]">
                            Detalles
                          </h1>
                          <span className="text-black font-light text-xl">
                            Variaciones: {variation}
                          </span>
                        </div>
                        <div className="hidden justify-center lg:flex">
                          <button
                            className="btn-success "
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
                <CompletePay />
              </>
            )}
          </form>
        </section>
      ) : (
        <section
          className=" bg-[#E7ECEF] flex "
          suppressHydrationWarning={true}
        >
          {/* Mobile */}
          <FormMobile data={data} video={video} />
        </section>
      )}
    </>
  );
}
