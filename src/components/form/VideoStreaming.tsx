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

export const VideoStreaming = ({ setOpen, data, video, next }: any) => {
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
      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        div: window,
      });

      // Simula el clic usando dispatchEvent en la referencia del elemento
      myElementRef.current.dispatchEvent(clickEvent);
    }
  };

  useEffect(() => {
    if (windowSize.width <= 700) {
      handleClick();
    }
  }, []);

  return (
    <>
      {windowSize.width <= 700 ? (
        <div>
          <section className="bg-black snap-start h-video h-screen flex justify-center items-center">
            {video}
            <div className="fixed px-3 flex items-center bg-grey-light cursor-pointer left-0 top-1 h-16 ">
              <div className="rounded-full bg-gradient-to-r from-[#42E083] via-yellow-500 to-[#FF8A00] p-[2px]">
                <div>
                  <img className="h-12 w-12 rounded-full" src={`${data.thumbnail}`}/>
                </div>
              </div>
              <div className="ml-4 flex-1 py-4">
                <div className="flex items-bottom justify-between">
                  <p className="text-grey-darkest">{data.name}</p>
                </div>
                <p className="text-grey-dark mt-1 text-sm">
                {data.description}
                </p>
              </div>
            </div>
            
            <div className="flex w-[70%] bottom-[160px] py-2 absolute left-0 items-center flex-row pl-3 rounded-r-full border-[#DAD2D2] border-l-0 border-1 border-spacing-2 border-sh shadow-md shadow-[#DAD2D2]">
                    <div className="rounded-full border-[#42E184] border-2">                        
                        <img className="h-12 w-12 rounded-full" src={`${data.thumbnail}`}/>
                    </div>

                    <div style={{ flex: 1, paddingLeft: 16 }}>
                        <div className="text-white text-sm pb-2">
                            <span >
                                Precio:{" "}
                                <span className="">
                                    $ {new Intl.NumberFormat().format(data.price)}
                                </span>
                            </span>
                        </div>
                        <div className="w-full h-[2px] bg-white"
                        ></div>
                        <div style={{ paddingTop: 8 }}>
                            <span className="text-[#42E184] font-semibold text-base">
                              Envío: GRATIS                               
                            </span>
                        </div>
                    </div>
                </div>

            <button
              className=" fixed bottom-0 btn-success w-full h-[54px] text-2xl font-bold"
              type="button"
              data-ripple-light="true"
              onClick={
                data.attributes?.length !== 0 ? () => setOpen(true) : next
              }
            >
              ¡Comprar Ahora!
            </button>
          </section>
        </div>
      ) : (
        <div className="w-full flex  justify-center">
          <div className="flex flex-row items-center w-full bg-white border border-gray-200 rounded-lg justify-evenly shadow md:flex-col pr-8 md:pr-5 md:py-0 py-2 max-w-screen-lg 2xl:pr-6 2xl:py-0">
            <div className="flex flex-col md:flex-row items-center w-full">
              <div className="w-full  rounded-lg m-8 videoPlayer max-h-[750px] 2xl:max-w-[464px] lg:max-w-[464px] max-w-[262px]">
                {video}
              </div>
              <div className="flex flex-col  h-full gap-12 justify-between items-center w-full 2xl:pt-16 xl:pt-16 pt-8 pb-8">
                <div className="flex flex-col 2xl:gap-8 xl:gap-6 gap-3 w-full">
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

                  <div className="flex flex-col 2xl:gap-8 xl:gap-6 gap-4">
                    {data.attributes?.map((attribute: any, index: number) => (
                      <div
                        key={index}
                        className="border-b-2 border-[#E3E8EF] w-full flex justify-between"
                      >
                        <label className="my-3 font-bold 2xl:text-xl xl:text-xl lg:text-base md:text-xs text-[#53545C]">
                          {attribute.description}
                        </label>
                        <ul className="flex gap-2">
                          {attribute.values.map(
                            (value: any, valueIndex: number) => (
                              <li
                                className="my-3 2xl:text-base xl:text-base text-xs font-light tracking-tight text-[#53545C]"
                                key={valueIndex}
                              >
                                {value.value}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:flex  w-full 2xl:h-[63px] xl:h-[63px] h-[35px] 2xl:justify-start">
                  <button
                    className="btn-success w-full "
                    ref={myElementRef}
                    type="button"
                    onClick={
                      data.attributes?.length !== 0 ? () => setOpen(true) : next
                    }
                    disabled={
                      data.attributes?.length !== 0
                        ? false
                        : currentStep === steps.length - 1
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
            <button className="hidden" onClick={handleClick}>
              Simular Clic
            </button>
          </div>
        </div>
      )}
    </>
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
