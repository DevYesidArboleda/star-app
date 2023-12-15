"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { FormDataSchema } from "../../../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { VideoStreaming } from "./VideoStreaming";
import { useSteps } from "../../hooks/useSteps";
import { usePrevs } from "../../hooks/useStepsPrev";
import { Select, SelectItem } from "@nextui-org/react";
import Modal from "../Modal/Modal";
import Steps from "./Steps";
import Image from "next/image";
import ReactPlayer from "react-player";
import { CompletePay } from "./CompletePay";
import { UseWindowSize } from "@/hooks/UseWindowSize";
import FormMobile from "./FormMobile";
import { Data, Doc } from "../../../interfaces";
import { useSearchParams } from "next/navigation";
import { dataApi } from "../../../api";
import { fetchDeparment, fetchCity } from "../utils/funtions";
import { Link, Button } from "react-scroll";
import axios from "axios";
import ErrorModel from "../Modal/ErrorModal";

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
  const [cityid, setCityid] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [finalData, setFinalData] = useState<any>([]);
  const [variation, setVaration] = useState("");
  const [client_notes, setClient_notes] = useState("");
  const [move, setMove] = useState<boolean>(false);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const [openError, setOpenError] = useState<boolean>(false);
  const delta = currentStep - previousStep;
  const windowSize = UseWindowSize();
  const searchParams = useSearchParams();
  const product_id = searchParams.get("productID");
  const user_id = searchParams.get("userID");
  const myElementRef = useRef<HTMLButtonElement>(null);

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

  //Envio de formulario
  const processForm: SubmitHandler<Inputs> = async (data) => {
    const client_quantity = quantity;
    const dataClient: any = {
      client_name: data.name,
      client_direction: data.street,
      department_id: data.department,
      city_id: data.city,
      client_surname: data.lastname,
      client_phone: data.phone,
      client_email: data.email,
    };

    const newData = {
      ...dataClient,
      user_id,
      product_id,
      client_quantity,
      client_notes,
    };
    try {
      console.log(dataClient);
      const response = await dataApi.post<any>("/orders/create-order", newData);
      console.log(response);
      if (response.data.ok) {
        setMove(true);
      }
      console.log("Se creo la orden");
    } catch (error: any) {
      console.error("Error al enviar los datos:", error);
      console.log(error.response.data.stack.message);
      setError(error.response.data.stack.message);      
      handleErrorModal();
      prev()
      //setTimeout(() => setOpenError(false), 10000)
    }
    //reset();
  };

  const handleErrorModal = () => {
    setOpenError(true);
  };

  type FieldName = keyof Inputs;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        console.log("esta llegando a la vaina");
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
      const final: any = dataFinal.data;
      final.forEach((element: any) => {
        setFinalData(element);
      });
    };

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
  }, [finalData]);

  useEffect(() => {
    fetchDeparment().then((e) => {
      setDepartment(e);
    });
  }, []);

  const handleInputDeparment = (e: any) => {
    let index = e.target.selectedIndex;
    setCityid(e.target.options[index].value);
  };

  //Capturar notas
  const handleInputNote = (e: any) => {
    let index = document.getElementById(`note`) as HTMLTextAreaElement;
    setClient_notes(index.value);
  };

  useEffect(() => {
    if (cityid !== 0) {
      fetchCity(cityid).then((e: any) => {
        setCity(e);
      });
    }
  }, [cityid]);

  const handleClick = () => {
    // Verifica que la referencia exista antes de intentar simular el clic
    if (myElementRef.current) {
      // Crea un evento de clic personalizado
      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });

      // Simula el clic usando dispatchEvent en la referencia del elemento
      myElementRef.current.dispatchEvent(clickEvent);
    }
  };

  useEffect(() => {
    if (windowSize.width <= 700) {
      handleClick();
      //Para prod se quita la resta
      setCurrentStep(-1);
    }
  }, []);

  return (
    <>
      <section
        className="bg-transparent h-scTestP inset-0 flex flex-col justify-between xl:p-14 md:p-4 items-center"
        suppressHydrationWarning={true}
      >
        <Steps currentStep={currentStep} />

        {/* Form */}
        <form
          className="md:mt-12 mt-4 bg-transparent rounded-md flex justify-center w-full"
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
                  <div className="flex flex-col pb-3 w-full">
                    <span className="mb-3 font-light text-base text-[#53545C]">
                      Cantidad
                    </span>
                    <div className="flex gap-4">
                      {quantity === 1 ? (
                        <button className="text-[#53545C]">-</button>
                      ) : (
                        <button
                          className="text-[#53545C]"
                          onClick={() =>
                            setQuantity((quantity) => quantity - 1)
                          }
                        >
                          -
                        </button>
                      )}
                      <span className="text-black">{quantity}</span>
                      <button
                        className="text-[#42E184]"
                        onClick={() => setQuantity((quantity) => quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-3 font-light text-base text-[#53545C]">
                      Seleccionar Talla
                    </span>
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
                  </div>
                  <button
                    className="btn-success-modal h-[58px] flex w-full items-center text-center justify-center"
                    type="button"
                    onClick={next}
                    ref={myElementRef}
                    disabled={currentStep === steps.length - 1}
                    data-ripple-light="true"
                  >
                    Continuar
                  </button>
                  {/* Botón que simula el clic en el otro botón */}
                  <button className="hidden" onClick={handleClick}>
                    Simular Clic
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
              {windowSize.width >= 768 ? (
                <div className="flex lg:flex-row lg:justify-center md:justify-around lg:gap-4 gap-2 flex-row-reverse lg:bg-transparent md:bg-white  md:border-gray-200 rounded-lg">
                  <div className="px-[16.5px] lg:py-[49.5px] md:py-[20.5px] lg:w-1/4 bg-Form w-[57%] max-w-[408px]">
                    <h2 className=" leading-7  text-black lg:text-xl md:text-base lg:font-medium md:font-bold text-center mb-5">
                      Hacer Pedido
                    </h2>
                    <span className="mt-1 text-base font-medium leading-6 text-[#8B8D97] md:hidden lg:flex">
                      Ingresa tus datos
                    </span>

                    <div className="mt-2 flex flex-col xl:gap-6 lg:gap-4 md:gap-4">
                      <div className="col-span-full">
                        <div className="mt-2">
                          <input
                            type="text"
                            id="name"
                            {...register("name", { pattern: /^[A-Za-z]+$/i })}
                            placeholder="Nombres"
                            className="bg-Form-input "
                          />
                          {errors.name?.message && (
                            <p className="mt-1 text-sm text-red-400">
                              {errors.name.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="col-span-full">
                        <div className="mt-2">
                          <input
                            type="text"
                            id="lastname"
                            {...register("lastname")}
                            placeholder="Apellidos"
                            className="bg-Form-input "
                          />
                          {errors.lastname?.message && (
                            <p className="mt-1 text-sm text-red-400">
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
                            <span className="mt-1 text-sm text-red-400">
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
                            <span className="mt-1 text-sm text-red-400">
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
                            <p className="mt-1 text-sm text-red-400">
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
                          >
                            Departamento
                            {department.length > 0 &&
                              department.map((items: any, index: number) => {
                                return (
                                  <option key={index} value={items.dropi_id}>
                                    {items.name}
                                  </option>
                                );
                              })}
                          </select>
                          {errors.department?.message && (
                            <span className="mt-1 text-sm text-red-400">
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
                          >
                            Ciudad
                            {city.length > 0 &&
                              city.map((items: any, index: number) => {
                                return (
                                  <option key={index} value={items.dropi_id}>
                                    {items.name}
                                  </option>
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
                          className="block text-[12px] font-normal leading-6 text-gray-900"
                        >
                          Notas adicionales
                        </label>
                        <div className="mt-2">
                          <textarea
                            id="note"
                            placeholder="Notas o información adicional"
                            className="bg-Form-input md:h-20"
                            autoComplete="street-address"
                            onChange={handleInputNote}
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

                  <div className=" 2xl:w-3/5 xl:w-4/5 lg:w-full lg:py-0 md:pt-4">
                    <div className="flex flex-col-reverse h-full items-center lg:bg-white lg:border lg:border-gray-200 lg:rounded-lg justify-start max-w-[936px] lg:shadow lg:flex-row pr-4 2xl:pr-6 xl:pr-6 lg:pr-6 lg:py-2 md:pr-1 md:py-1 py-2">
                      <div className="xl:w-[390px] lg:w-full md:w-[364px] lg:h-auto md:h-[272px] rounded-md lg:m-8 md:m-4 videoPlayer w-10/12 max-h-[750px]">
                        {video}
                      </div>
                      <div className="flex flex-col  h-full gap-12 justify-between items-start w-full md:max-w-[364px] lg:max-w-full xl:max-w-[430px] 2xl:pb-8 2xl:pt-16 xl:pb-8 xl:pt-16 lg:pb-8 lg:pt-16 lg:pr-0 md:pr-0">
                        <div className="flex flex-col 2xl:gap-8 xl:gap-6 lg:gap-2 md:gap-0 w-full">
                          <div className="border-b-2 lg:border-[#D9D9D9] border-transparent w-full">
                            <h1 className="text-black font-bold 2xl:text-2xl xl:text-2xl lg:text-base items-center lg:flex md:hidden justify-center pb-6">
                              Detalles de la orden
                            </h1>
                            <h1 className="text-black font-bold 2xl:text-2xl xl:text-2xl lg:text-base items-center lg:hidden md:flex justify-center pb-6">
                              Resumen de la compra
                            </h1>
                          </div>
                          <div className="border-b-2 border-[#D9D9D9] w-full">
                            <div className="flex justify-between">
                              <h1 className="my-3 2xl:text-xl lg:text-base text-[#53545C] xl:text-xl  font-bold ">
                                Producto
                              </h1>
                              <br />
                              <h5 className="my-3 font-light text-[#53545C] 2xl:text-base xl:text-base text-xs">
                                {data && data.name}
                              </h5>
                            </div>
                          </div>
                          <div className="border-b-2 border-[#D9D9D9] w-full justify-between flex">
                            <span className="my-3 font-bold text-[#53545C] 2xl:text-xl xl:text-xl  lg:text-base">
                              Método de pago
                            </span>
                            <span className="my-3 font-light text-[#53545C] 2xl:text-base xl:text-base text-xs">
                              Paga al recibir
                            </span>
                          </div>
                          <div className="border-b-2 border-[#D9D9D9] w-full justify-between flex">
                            <span className="my-3 font-bold 2xl:text-xl xl:text-xl  lg:text-base text-[#53545C] ">
                              Envío
                            </span>
                            <span className="my-3 font-bold 2xl:text-xl text-base text-[#42E184] ">
                              GRATIS
                            </span>
                          </div>
                          <div className="border-b-2 border-[#D9D9D9] w-full flex justify-between">
                            <span className="my-3 font-bold 2xl:text-xl xl:text-xl  lg:text-base text-[#53545C]">
                              Color
                            </span>
                            <span className="my-3 2xl:text-base xl:text-base text-xs font-light tracking-tight text-[#53545C]">
                              Por definir
                            </span>
                          </div>
                          <div className="border-b-2 border-[#D9D9D9] w-full flex justify-between">
                            <h1 className="my-3 font-bold 2xl:text-xl xl:text-xl lg:text-base text-[#53545C]">
                              Tallas
                            </h1>
                            <span className="my-3 2xl:text-base xl:text-base text-xs font-light tracking-tight text-[#53545C]">
                              {variation}
                            </span>
                          </div>
                          <div className="border-b-2 border-[#D9D9D9] w-full flex justify-between">
                            <h1 className="my-3 font-bold 2xl:text-xl xl:text-xl lg:text-base text-[#53545C]">
                              Total
                            </h1>
                            <span className="my-3 2xl:text-base xl:text-base text-xs font-light tracking-tight text-[#53545C]">
                              {data && data.price}
                            </span>
                          </div>
                        </div>
                        <div className="hidden justify-center lg:flex w-full ">
                          <button
                            className="btn-success w-full xl:h-[63px] lg:h-[63px]"
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
              ) : (
                <div>
                  <div className="flex flex-col items-center w-full bg-white border border-gray-200 rounded-lg">
                    <div className="">
                      <div className="w-auto mx-4 mt-4 pb-6 videoPlayer flex flex-col gap-3 border-b-1 border-[#D9D9D9]">
                        {video}
                        <button className="btn-success w-full h-[54px]">
                          <Link
                            activeClass="active"
                            to="page1"
                            spy={true}
                            smooth={true}
                            offset={0}
                            duration={500}
                            className="w-full flex text-center items-center justify-center"
                          >
                            Comprar ahora
                          </Link>
                        </button>
                      </div>
                    </div>

                    <div id="page1" className="flex flex-col w-full">
                      <div className="w-full px-12 pt-10 pb-9">
                        <h1 className="w-full flex justify-center mb-4 text-black text-base">
                          Detalles de la compra
                        </h1>
                        <div className="flex flex-col pb-3 w-full border-b-1 border-[#D9D9D9] mb-3">
                          <span className="mb-3 font-light text-base text-[#53545C]">
                            Valor total
                          </span>
                          <span className="mb-3 font-semibold text-black text-base">
                            $ {data.price}
                          </span>
                        </div>
                        <div className="flex flex-col pb-3 w-full border-b-1 border-[#D9D9D9] mb-3">
                          <span className="mb-3 font-light text-base text-[#53545C]">
                            Cantidad
                          </span>
                          <div className="flex gap-4">
                            {quantity === 1 ? (
                              <button className="text-[#53545C] w-3">-</button>
                            ) : (
                              <button
                                className="text-[#53545C]"
                                onClick={() =>
                                  setQuantity((quantity) => quantity - 1)
                                }
                              >
                                -
                              </button>
                            )}
                            <span className="text-black">{quantity}</span>
                            <button
                              className="text-[#42E184]"
                              onClick={() =>
                                setQuantity((quantity) => quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <span className="mb-3 font-light text-base text-[#53545C]">
                            Seleccionar Talla
                          </span>
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
                        </div>
                      </div>
                      <button className="flex w-full px-4 pb-16">
                        <Link
                          activeClass="active"
                          to="page2"
                          spy={true}
                          smooth={true}
                          offset={0}
                          duration={500}
                          className="btn-success-modal h-[58px] flex w-full items-center text-center justify-center"
                        >
                          Continuar
                        </Link>
                      </button>
                    </div>

                    <div id="page2" className="w-full">
                      <div className="px-4 bg-Form w-full ">
                        <span className="mt-1 text-base font-medium leading-6 text-[#8B8D97] w-full flex justify-center">
                          Ingresa tus datos
                        </span>

                        <div className="mt-2 flex flex-col gap-4 pb-6 mb-4 border-b-1 border-[#D9D9D9]">
                          <div className="col-span-full">
                            <div className="mt-2">
                              <input
                                type="text"
                                id="name"
                                {...register("name", {
                                  pattern: {
                                    value: /[A-Za-z]/,
                                    message: "Nombre no válido",
                                  },
                                })}
                                placeholder="Nombres"
                                className="bg-Form-input text-xs h-[52px]"
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
                                id="lastname"
                                {...register("lastname")}
                                placeholder="Apellidos"
                                className="bg-Form-input text-xs h-[52px]"
                              />
                              {errors.lastname?.message && (
                                <p className="mt-1 text-sm text-red-400">
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
                                className="bg-Form-input text-xs h-[52px]"
                              />
                              {errors.phone?.message && (
                                <span className="mt-1 text-sm text-red-400">
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
                                className="bg-Form-input text-xs h-[52px]"
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
                                className="bg-Form-input text-xs h-[52px]"
                              />
                              {errors.street?.message && (
                                <p className="mt-1 text-sm text-red-400">
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
                                className="bg-Form-input text-xs h-[52px]"
                                onChange={handleInputDeparment}
                              >
                                Departamento
                                {department.length > 0 &&
                                  department.map(
                                    (items: any, index: number) => {
                                      return (
                                        <option
                                          key={index}
                                          value={items.dropi_id}
                                        >
                                          {items.name}
                                        </option>
                                      );
                                    }
                                  )}
                              </select>
                              {errors.department?.message && (
                                <span className="mt-1 text-sm text-red-400">
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
                                className="bg-Form-input text-xs h-[52px]"
                              >
                                Ciudad
                                {city.length > 0 &&
                                  city.map((items: any, index: number) => {
                                    return (
                                      <option
                                        key={index}
                                        value={items.dropi_id}
                                      >
                                        {items.name}
                                      </option>
                                    );
                                  })}
                              </select>
                              {errors.city?.message && (
                                <span className="mt-1 text-sm text-red-400">
                                  {errors.city.message}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="col-span-full">
                            <label
                              htmlFor="city"
                              className="block text-[12px] font-normal leading-6 text-gray-900"
                            >
                              Notas adicionales
                            </label>
                            <div className="mt-2">
                              <textarea
                                id="note"
                                placeholder="Notas o información adicional"
                                className="bg-Form-input h-28 text-xs"
                                autoComplete="street-address"
                                onChange={handleInputNote}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col px-16 w-full">
                          <div className="border-b-1 lg:border-[#D9D9D9] border-transparent w-full">
                            <h1 className="text-black font-bold text-base items-center flex justify-center pb-6">
                              Resumen
                            </h1>
                          </div>
                          <div className="border-b-1 border-[#D9D9D9] w-full">
                            <div className="flex justify-between">
                              <h1 className="my-4 text-xs text-[#53545C]  font-bold ">
                                Producto
                              </h1>
                              <br />
                              <h5 className="my-4 font-light text-[#53545C] text-xs">
                                {data && data.name}
                              </h5>
                            </div>
                          </div>
                          <div className="border-b-1 border-[#D9D9D9] w-full justify-between flex">
                            <span className="my-4 font-bold text-[#53545C] text-xs">
                              Método de pago
                            </span>
                            <span className="my-4 font-light text-[#53545C] text-xs">
                              Paga al recibir
                            </span>
                          </div>
                          <div className="border-b-1 border-[#D9D9D9] w-full justify-between flex">
                            <span className="my-4 font-bold text-xs text-[#53545C] ">
                              Envío
                            </span>
                            <span className="my-4 font-bold 2xl:text-xl text-xs text-[#42E184] ">
                              GRATIS
                            </span>
                          </div>
                          <div className="border-b-1 border-[#D9D9D9] w-full flex justify-between">
                            <span className="my-4 font-bold text-xs text-[#53545C]">
                              Color
                            </span>
                            <span className="my-4 text-xs font-light tracking-tight text-[#53545C]">
                              Por definir
                            </span>
                          </div>
                          <div className="border-b-1 border-[#D9D9D9] w-full flex justify-between">
                            <h1 className="my-4 font-bold text-xs text-[#53545C]">
                              Tallas
                            </h1>
                            <span className="my-4 text-xs font-light tracking-tight text-[#53545C]">
                              {variation}
                            </span>
                          </div>
                          <div className="w-full flex justify-between pb-6">
                            <h1 className="my-4 font-bold text-xs text-[#53545C]">
                              Total
                            </h1>
                            <span className="my-4 text-xs font-light tracking-tight text-[#53545C]">
                              {data && data.price}
                            </span>
                          </div>
                        </div>
                        <div className=" justify-center flex w-full pb-4">
                          <button
                            className="btn-success w-full h-[54px] text-base"
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
              )}
            </motion.div>
          )}

          <ErrorModel isOpen={openError} onClose={() => setOpenError(false)}>
            <div className="gap-2">
              <div className="flex justify-center w-full gap-2">
                <svg
                  fill="#000000"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 478.125 478.125"
                  className="w-8"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g>
                      {" "}
                      <g>
                        {" "}
                        <g>
                          {" "}
                          <circle
                            cx="239.904"
                            cy="314.721"
                            r="35.878"
                          ></circle>{" "}
                          <path d="M256.657,127.525h-31.9c-10.557,0-19.125,8.645-19.125,19.125v101.975c0,10.48,8.645,19.125,19.125,19.125h31.9 c10.48,0,19.125-8.645,19.125-19.125V146.65C275.782,136.17,267.138,127.525,256.657,127.525z"></path>
                          <path d="M239.062,0C106.947,0,0,106.947,0,239.062s106.947,239.062,239.062,239.062c132.115,0,239.062-106.947,239.062-239.062 S371.178,0,239.062,0z M239.292,409.734c-94.171,0-170.595-76.348-170.595-170.596c0-94.248,76.347-170.595,170.595-170.595 s170.595,76.347,170.595,170.595C409.887,333.387,333.464,409.734,239.292,409.734z"></path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>
              </div>
              <span className="flex justify-center text-sm text-justify text-black p-4">
                {error}
              </span>
            </div>
          </ErrorModel>

          {move === true && (
            <>
              <CompletePay user_id={user_id} />
            </>
          )}
        </form>
      </section>
    </>
  );
}
