"use client";

import { useState, useEffect, useRef, Fragment } from "react";
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
import { useSearchParams } from "next/navigation";
import { dataApi } from "../../../api";
import { fetchDeparment, fetchCity } from "../utils/funtions";
import { Link, Button } from "react-scroll";
import axios from "axios";
import ErrorModel from "../Modal/ErrorModal";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

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
    const variation_id = variation;
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
      variation_id,
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
      prev();
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
      //handleClick();
      //Para prod se quita la resta
      //setCurrentStep(-1);
    }
  }, []);

  const handleSelectChange = () => {
    // Realizar la búsqueda en el arreglo aquí
    const resultado = data.attributes.find((attribute: any) => {
      return attribute.values.some((value: any) => value.value === variation);
    });

    if (resultado) {
      console.log(`Descripción: ${resultado.description}`);
      console.log(`Es variación: ${resultado.isVariation}`);
      console.log(`Valor seleccionado: ${variation}`);
    }
  };

  const [selectedAttribute, setSelectedAttribute] = useState(data.attributes);
  const [query, setQuery] = useState("");

  const filteredAttributes =
    query === ""
      ? data.variations
      : data.variations.filter((attribute: any) => {
          return (
            attribute.stock.toLowerCase().includes(query.toLowerCase()) ||
            attribute.values.some((value: any) =>
              value.value.toLowerCase().includes(query.toLowerCase())
            )
          );
        });

  console.log("aja", variation);

  const [selectedVariations, setSelectedVariations] = useState<{
    [key: string]: string;
  }>({});
  const [existingVariationId, setExistingVariationId] = useState<string | null>(
    null
  );
  const [combinationUnavailable, setCombinationUnavailable] =
    useState<boolean>(false);

  const handleVariationChange = (
    attributeName: string,
    valueId: string,
    variationId: string
  ) => {
    const newVariations = { ...selectedVariations, [attributeName]: valueId };

    // Verificar si ambos selectores están diligenciados
    if (Object.values(newVariations).every((value) => !!value)) {
      const existingVariation = findExistingVariation(newVariations);

      if (existingVariation) {
        setExistingVariationId(existingVariation.id);
        setCombinationUnavailable(false); // La combinación está disponible
      } else {
        setExistingVariationId(null);
        setCombinationUnavailable(true); // La combinación no está disponible
      }
    } else {
      // Si alguno de los selectores no está diligenciado, reiniciar la verificación, el mensaje y bloquear los selectores siguientes
      setExistingVariationId(null);
      setCombinationUnavailable(false);
      resetNextSelectors(attributeName);
    }

    setSelectedVariations(newVariations);
  };

  const resetNextSelectors = (currentAttributeName: string) => {
    // Reiniciar los valores de los selectores siguientes al actual
    const attributeIndex = data.attributes?.findIndex(
      (attribute: any) => attribute.description === currentAttributeName
    );

    if (attributeIndex !== undefined && data.attributes) {
      data.attributes.slice(attributeIndex + 1).forEach((attribute: any) => {
        setSelectedVariations((prevVariations) => ({
          ...prevVariations,
          [attribute.description]: "",
        }));
      });
    }
  };

  const findExistingVariation = (newVariations: { [key: string]: string }) => {
    return data.variations?.find((variation: any) => {
      return Object.entries(newVariations).every(([key, value]) => {
        return variation.values.some(
          (v: any) => v.attribute_name === key && v.id === value
        );
      });
    });
  };

  console.log("na", existingVariationId);
  console.log("naa", variation);

  return (
    <>
      <section
        className="bg-transparent h-scTestP inset-0 flex flex-col justify-between xl:p-14 md:p-4 items-center"
        suppressHydrationWarning={true}
      >
        <Steps currentStep={currentStep} />

        {/* Form */}
        <form
          className={`md:mt-12 ${
            currentStep === 0 ? "" : "p-4"
          } bg-transparent rounded-md flex justify-center w-full`}
          onSubmit={handleSubmit(processForm)}
        >
          {currentStep === 0 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full"
            >
              <VideoStreaming
                setOpen={setOpen}
                data={data}
                video={video}
                next={next}
              />

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

                  {/* <span className="py-4 text-black">Opcion 1</span>
                  <div className="flex flex-col">
                    {data.attributes?.map((attribute: any, index: number) => (
                      <div key={index} className="flex flex-col">
                        <label className="mb-3 font-light text-base text-[#53545C]">
                          Seleccionar {attribute.description}
                        </label>
                        <Select
                          label="Seleccionar ..."
                          className="max-w-xs mb-3 font-light text-base text-[#53545C]"
                          onChange={handleSelectChange}
                        >
                          {attribute.values.map(
                            (value: any, valueIndex: number) => (
                              <SelectItem
                                key={valueIndex}
                                value={value.value}
                                className="text-black"
                                onClick={() => setVaration(value.value)}
                              >
                                {value.value}
                              </SelectItem>
                            )
                          )}
                        </Select>
                      </div>
                    ))}
                  </div> */}

                  {/* <span className="py-4 text-black">Opcion 2</span>
                  <div className="flex static top-16 w-72 pb-4">
                    <Combobox
                      value={selectedAttribute}
                      onChange={setSelectedAttribute}
                    >
                      <div className="relative mt-1">
                        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                          <Combobox.Input
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                            displayValue={(attribute: any) =>
                              attribute.values
                                .map((value: any) => value.value)
                                .join(" / ")
                            }
                            onChange={(event) => setQuery(event.target.value)}
                          />
                          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </Combobox.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                          afterLeave={() => setQuery("")}
                        >
                          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {filteredAttributes?.length === 0 &&
                            query !== "" ? (
                              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                Nothing found.
                              </div>
                            ) : (
                              filteredAttributes?.map((attribute: any) => (
                                <Combobox.Option
                                  key={attribute.stock}
                                  onClick={() => setVaration(attribute.id)}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                      active
                                        ? "bg-teal-600 text-black"
                                        : "text-gray-900"
                                    }`
                                  }
                                  value={attribute}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
                                        }`}
                                      >
                                        <div className="flex flex-row gap-1 ">
                                          {attribute.values
                                            .map(
                                              (
                                                value: any,
                                                valueIndex: number
                                              ) => value.value
                                            )
                                            .join(" / ")}
                                        </div>
                                      </span>
                                      {selected ? (
                                        <span
                                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                            active
                                              ? "text-black"
                                              : "text-teal-600"
                                          }`}
                                        >
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Combobox.Option>
                              ))
                            )}
                          </Combobox.Options>
                        </Transition>
                      </div>
                    </Combobox>
                  </div> 

                  <span>opcion 3</span>*/}
                  <div className="text-black pb-3">
                    {data.attributes?.map((attribute: any, index: number) => (
                      <div key={attribute.id} className="flex flex-col">
                        <label
                          htmlFor={attribute.description}
                          className="mb-3 font-light text-base text-[#53545C]"
                        >{`Seleccionar ${attribute.description}:`}</label>
                        <select
                          key={attribute.stock}
                          id={attribute.description}
                          className="rounded-medium bg-default-100  p-4 text-star appearance-none  transition duration-500 transform border-none focus:outline-none text-foreground-500 text-ellipsis text-sm font-light"
                          onChange={(e) =>
                            handleVariationChange(
                              attribute.description,
                              e.target.value,
                              e.target.selectedOptions[0]?.getAttribute(
                                "data-value-id"
                              ) || ""
                            )
                          }
                          onClick={() => setVaration(attribute.id)}
                          value={
                            selectedVariations[attribute.description] || ""
                          }
                        >
                          <option
                            value=""
                            disabled
                            className="text-foreground-500 text-ellipsis text-sm font-light"
                          >
                            Seleccionar ...
                          </option>
                          {attribute.values.map((value: any) => (
                            <option
                              key={value.id}
                              value={value.id}
                              data-value-id={value.id}
                              className="text-foreground-500 text-ellipsis text-small"
                            >
                              {value.value}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}

                    {combinationUnavailable && (
                      <div className="text-red-500 py-2">
                        <p>¡La combinación seleccionada no está disponible!</p>
                      </div>
                    )}

                    {/*existingVariationId && !combinationUnavailable && (
                      <div>
                        <h2>ID de la Variación Existente:</h2>
                        <p>{existingVariationId}</p>
                      </div>
                    )*/}

                    {/* <div>
                      <h2>Variaciones Seleccionadas:</h2>
                      <pre>{JSON.stringify(selectedVariations, null, 2)}</pre>
                    </div> */}
                  </div>

                  <button
                    className="btn-success-modal h-[58px] flex w-full items-center text-center justify-center"
                    type="button"
                    onClick={next}
                    ref={myElementRef}
                    disabled={
                      windowSize.width >= 768 && existingVariationId === null
                    }
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
                              {variation}
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
                  <div className="flex justify-center items-center">
                      <div className="flex  w-5 h-5">
                      <Image
                        onClick={prev}
                        src="/img/backPage.png"
                        alt=""
                        width={20}
                        height={20}
                      />
                      </div>
                    <span className="text-base text-center items-center font-bold w-full flex content-center text-black py-2 justify-center">
                      Detalles de la compra
                    </span>
                  </div>
                  <div className="flex flex-col items-center w-full ">
                    <div id="page1" className="flex flex-col w-full gap-4">
                      <div className="w-full px-12 pt-10 pb-9 bg-white border border-gray-200 rounded-lg">
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
                          <div className="text-black ">
                            {data.attributes?.map(
                              (attribute: any, index: number) => (
                                <div
                                  key={attribute.id}
                                  className="flex flex-col"
                                >
                                  <label
                                    htmlFor={attribute.description}
                                    className="mb-3 font-light text-base text-[#53545C]"
                                  >{`Seleccionar ${attribute.description}:`}</label>
                                  <select
                                    key={attribute.stock}
                                    id={attribute.description}
                                    className="rounded-medium bg-default-100  p-4 text-star appearance-none  transition duration-500 transform border-none focus:outline-none text-foreground-500 text-ellipsis text-sm font-light"
                                    onChange={(e) =>
                                      handleVariationChange(
                                        attribute.description,
                                        e.target.value,
                                        e.target.selectedOptions[0]?.getAttribute(
                                          "data-value-id"
                                        ) || ""
                                      )
                                    }
                                    onClick={() => setVaration(attribute.id)}
                                    value={
                                      selectedVariations[
                                        attribute.description
                                      ] || ""
                                    }
                                  >
                                    <option
                                      value=""
                                      disabled
                                      className="text-foreground-500 text-ellipsis text-sm font-light"
                                    >
                                      Seleccionar ...
                                    </option>
                                    {attribute.values.map((value: any) => (
                                      <option
                                        key={value.id}
                                        value={value.id}
                                        data-value-id={value.id}
                                        className="text-foreground-500 text-ellipsis text-small"
                                      >
                                        {value.value}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )
                            )}

                            {combinationUnavailable && (
                              <div className="text-red-500 pt-2">
                                <p>
                                  ¡La combinación seleccionada no está
                                  disponible!
                                </p>
                              </div>
                            )}

                            {/*existingVariationId && !combinationUnavailable && (
                      <div>
                        <h2>ID de la Variación Existente:</h2>
                        <p>{existingVariationId}</p>
                      </div>
                    )*/}

                            {/* <div>
                      <h2>Variaciones Seleccionadas:</h2>
                      <pre>{JSON.stringify(selectedVariations, null, 2)}</pre>
                    </div> */}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col px-12 w-full bg-white border border-gray-200 rounded-lg">
                        <div className="border-b-1 lg:border-[#D9D9D9] border-transparent w-full">
                          <h1 className="text-black font-bold text-base items-center flex justify-center py-6">
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
                          <h1 className="my-4 font-bold text-base text-[#42E184]">
                            Total
                          </h1>
                          <span className="my-4 text-xs font-light tracking-tight text-[#53545C]">
                            {data && data.price}
                          </span>
                        </div>
                      </div>
                      <button className="flex w-full pb-16 ">
                        <Link
                          activeClass="active"
                          to="page2"
                          spy={true}
                          smooth={true}
                          offset={0}
                          duration={500}
                          className="btn-success-modal h-[48px] flex w-full items-center text-center justify-center text-[#53545C]"
                        >
                          Continuar con la compra
                        </Link>
                      </button>
                    </div>

                    <div id="page2" className="w-full">
                      <div className="px-4 bg-Form w-full bg-white border border-gray-200 rounded-lg">
                        <span className="mt-1 text-base font-medium leading-6 text-[#8B8D97] w-full flex justify-center pt-3">
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
                      </div>
                    </div>
                    <div className=" justify-center flex w-full pb-4 pt-4">
                      <button
                        className="btn-success w-full h-[48px] text-base text-[#53545C]"
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
              )}
            </motion.div>
          )}

          <ErrorModel isOpen={openError} onClose={() => setOpenError(false)}>
            <div className="gap-2">
              <div className="flex justify-center w-full gap-2">
                <Image src="/img/task_alt.svg" alt="" width={32} height={32} />
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
