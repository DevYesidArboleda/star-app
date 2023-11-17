import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import next, { steps } from "./Form";
import { useSteps } from "../hooks/useSteps";
import Image from "next/image";
import { usePrevs } from "../hooks/useStepsPrev";

interface typeData {
  name: string;
  description: string;
  price: number;
  tags: string[];
}

export const VideoStreaming = ({ setOpen, data, video }: any) => {
  const { currentStep, setCurrentStep } = useSteps();

  /*useEffect(() => {
    setVideo(<ReactPlayer url={`${url}`} controls={true} height="750px" width="464px"/>);
  }, []);*/

  return (
    <div>
      <div className="flex flex-row items-center bg-white border border-gray-200 rounded-lg justify-evenly shadow md:flex-col pr-8 md:pr-5 md:py-4 py-2">
        <div className="flex flex-col md:flex-row">
          <div className="w-auto h-4/5 rounded-md m-8 videoPlayer">{video}</div>
          <div className="flex flex-col  h-full gap-12 justify-start items-start">
            <div className="border-b-2 border-[#8B8C89] w-full">
              <div className="flex">
                <h1 className="text-2xl  text-[#53545C] font-bold">Producto</h1>
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
            <div className="lg:flex hidden w-full justify-center">
              <button
                className="btn-success"
                type="button"
                onClick={data[2]?.tags !== null ? () => setOpen(true) : next}
                disabled={
                  data[2]?.tags !== null
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
        <div className="flex w-full justify-center lg:hidden ">
            <button
              className="btn-success w-full ml-5"
              type="button"
              onClick={data[2]?.tags !== null ? () => setOpen(true) : next}
              disabled={
                data[2]?.tags !== null
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
