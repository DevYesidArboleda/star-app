"use client";

import { TSignUpSchema, signUpSchema } from "../../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";

export default function FormMobile({ data, video }: any) {
    const [variation, setVaration] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: TSignUpSchema) => {
    // TODO: submit to server
    // ...
    await new Promise((resolve) => setTimeout(resolve, 1000));

    reset();
  };

  return (
    <>
      <div>
        <h1 className="text-black font-medium text-xl my-3 text-center">
          Hacer Pedido
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2 items-center bg-white border border-gray-200 rounded-lg justify-evenly shadow md:flex-row m-4"
        >
          <div className="flex w-full flex-col px-4">
            <p className="mt-1 text-sm leading-6 text-gray-600 text-center">
              Ingresa tus datos
            </p>

            <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-2 sm:grid-cols-6">
              <div className="col-span-full">
                <div className="mt-2">
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    placeholder="Nombre completo"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
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
                    type="number"
                    id="phone"
                    {...register("phone")}
                    placeholder="Telefono"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.phone?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.phone.message}
                    </p>
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.email.message}
                    </p>
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
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
                    autoComplete="country-name"
                    placeholder="Ciudad"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>Cali</option>
                    <option>Bogota</option>
                    <option>Medellin</option>
                  </select>
                  {errors.city?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Notas adicionales
                </label>
                <div className="mt-2">
                  <textarea
                    id="note"
                    placeholder="Notas o información adicional"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
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
        </div>
            </div>
          </div>
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded text-black"
          />
          {errors.email && (
            <p className="text-red-500">{`${errors.email.message}`}</p>
          )}

          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded text-black"
          />
          {errors.password && (
            <p className="text-red-500">{`${errors.password.message}`}</p>
          )}

          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm password"
            className="px-4 py-2 rounded text-black"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
          )}

          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
