import React, { useEffect, useRef } from "react";
import next, { steps } from "@/components/form/FormUnit";
import { useSteps } from "../../hooks/useSteps";
import Image from "next/image";
import { usePrevs } from "../../hooks/useStepsPrev";
import { UseWindowSize } from "@/hooks/UseWindowSize";

interface typeData {
  name: string;
  description: string;
  price: number;
  tags: string[];
}

interface ArrayDeArrays {
  TypeData: typeData[][];
}

export const VideoStreaming = ({ setOpen, data, video }: any) => {
  const { currentStep, setCurrentStep } = useSteps();
  const myElementRef = useRef<HTMLButtonElement>(null);
  const windowSize = UseWindowSize();

  /*useEffect(() => {
    setVideo(<ReactPlayer url={`${url}`} controls={true} height="750px" width="464px"/>);
  }, []);*/

  const handleClick = () => {
    // Verifica que la referencia exista antes de intentar simular el clic
    if (myElementRef.current) {
      // Crea un evento de clic personalizado
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      });

      // Simula el clic usando dispatchEvent en la referencia del elemento
      myElementRef.current.dispatchEvent(clickEvent);
    }
  };

  useEffect(() => {
    if(windowSize.width <= 700 ){            
      handleClick()
    }
  }, []);

  return (
    <div className="w-full flex  justify-center">
      <div className="flex flex-row items-center w-full bg-white border border-gray-200 rounded-lg justify-evenly shadow md:flex-col pr-8 md:pr-5 md:py-0 py-2 max-w-screen-lg 2xl:pr-6 2xl:py-0">
        <div className="flex flex-col md:flex-row items-center w-full">
          <div className="w-full  rounded-lg m-8 videoPlayer max-h-[750px] 2xl:max-w-[464px] lg:max-w-[464px] max-w-[262px]">
            {video}
          </div>
          <div className="flex flex-col  h-full gap-12 justify-between items-center w-full 2xl:pt-16 xl:pt-16 pt-8 pb-8">
            <div className="flex flex-col 2xl:gap-12 xl:gap-8 gap-3 w-full">
              <div className="border-b-2 border-[#E3E8EF] w-full md:mb-4">
                <h1 className="text-black font-bold 2xl:text-2xl xl:text-2xl lg:text-xs items-center flex justify-center pb-6">
                  Detalles de la orden
                </h1>
              </div>
              <div className="border-b-2 border-[#E3E8EF] w-full">
                <div className="flex justify-between">
                  <h1 className="my-3 2xl:text-xl xl:text-xl lg:text-xs md:text-xs text-[#53545C] font-bold ">
                    Producto
                  </h1>
                  <br />
                  <h5 className="my-3 font-light text-[#53545C] 2xl:text-base xl:text-base text-xs">
                    {data && data.name}
                  </h5>
                </div>
              </div>
              <div className="border-b-2 border-[#E3E8EF] w-full justify-between flex">
                <span className="my-3 font-bold text-[#53545C] 2xl:text-xl xl:text-xl lg:text-xs md:text-xs">
                  Método de pago
                </span>
                <span className="my-3 font-light text-[#53545C] 2xl:text-base xl:text-base text-xs">
                  Paga al recibir
                </span>
              </div>
              <div className="border-b-2 border-[#E3E8EF] w-full justify-between flex">
                <span className="my-3 font-bold 2xl:text-xl xl:text-xl lg:text-xs md:text-xs text-[#53545C] ">
                  Envío
                </span>
                <span className="my-3 font-bold 2xl:text-xl text-base text-[#42E184] ">
                  GRATIS
                </span>
              </div>
              <div className="border-b-2 border-[#E3E8EF] w-full flex justify-between">
                <span className="my-3 font-bold 2xl:text-xl xl:text-xl lg:text-xs md:text-xs text-[#53545C]">
                  Colores disponibles
                </span>
                <span className="my-3 2xl:text-base xl:text-base text-xs font-light tracking-tight text-[#53545C]">
                  Por definir
                </span>
              </div>
              <div className="border-b-2 border-[#E3E8EF] w-full flex justify-between">
                <h1 className="my-3 font-bold 2xl:text-xl xl:text-xl lg:text-base md:text-xs text-[#53545C]">
                  Tallas disponibles
                </h1>
                <ul className="flex gap-2">
                  {data.tags?.length > 0 &&
                    data.tags?.map((items: any, index: number) => {
                      return (
                        <li
                          key={index}
                          className="my-3 2xl:text-base xl:text-base text-xs font-light tracking-tight text-[#53545C]"
                        >
                          {items}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div className="lg:flex  w-full 2xl:h-[63px] xl:h-[63px] h-[35px] 2xl:justify-start">
              <button
                className="btn-success w-full "
                ref={myElementRef}
                type="button"
                onClick={data.tags !== null ? () => setOpen(true) : next}
                disabled={
                  data.tags !== null ? false : currentStep === steps.length - 1
                }
                data-ripple-light="true"
              >
                Comprar producto
              </button>
            </div>
          </div>
        </div>
        
      </div>
      <div>
      {/* Agrega la referencia al elemento */}
            
      {/* Botón que simula el clic en el otro botón */}
      <button className="hidden" onClick={handleClick}>Simular Clic</button>
    </div>
    </div>
  );
};

/*
  traer todos los produsctos

    <div>
    { data.map((item:typeData, index:number) => {
    console.log("item:::::", item)
    return (
        <div key={index}>{item.name}</div>
    )
  })}
  </div>

  

            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Provide your personal details.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="firstName"
                    {...register("firstName")}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.firstName?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="lastName"
                    {...register("lastName")}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.lastName?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
*/
