"use client";

import { TFormDataSchemaUser, FormDataSchemaUser } from "../../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CompletePay } from "./CompletePay";
import ReactPlayer from "react-player";

export default function FormMobile({ data, video }: any) {
  const [variation, setVaration] = useState("");
  const [move, setMove] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TFormDataSchemaUser>({
    resolver: zodResolver(FormDataSchemaUser),
  });

  const onSubmit = async (data: TFormDataSchemaUser) => {
    // TODO: submit to server
    // ...
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("llego aqui")
    reset();
    setMove(true)
  };

  return (
    <>
      <div className="bg-[#E7ECEF] pb-2 ">
        {move === false && (
          <motion.div
            initial={{ x: 0 >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h1 className="text-black font-bold text-xl my-3 text-center">
              Hacer Pedido
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-y-2 items-center bg-white border border-gray-200 rounded-lg justify-evenly shadow md:flex-row m-4"
            >
              <div className="flex w-full flex-col px-4">
                <p className="mt-4 text-sm leading-6 text-gray-600 text-center ">
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
                        className="bg-Form-input"
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
                        className="bg-Form-input"
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
                        className="bg-Form-input"
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
                        className="bg-Form-input"
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
                        className="bg-Form-input"
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
                    <div className="mt-2">
                      <textarea
                        id="note"
                        placeholder="Notas o información adicional"
                        className="bg-Form-input"
                      />
                    </div>
                  </div>
                  <h1 className="w-full flex justify-center mb-4 text-black text-xl mt-6">
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
                  <div className="w-auto h-4/5 rounded-md m-8 videoPlayer">
                    {video}
                  </div>
                  <div className="flex flex-col  h-full gap-12 justify-center items-center">
                    <div className="border-b-2 border-[#D9D9D9a3] w-full">
                      <div className="flex items-center justify-center">
                        <h1 className="text-2xl  text-[#53545C] font-bold text-center">
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
                      <h5 className="mb-2 text-xl font-normal tracking-tight text-black text-center">
                        {data && data[2]?.name}
                      </h5>
                    </div>
                    <div className="border-b-2 border-[#D9D9D9a3] w-full">
                      <span className=" flex flex-col mb-3 font-bold text-2xl text-[#53545C] text-center">
                        Valor del producto
                      </span>
                      <span className="mb-3 font-normal text-black text-xl flex w-full justify-center">
                        {data && data[2]?.price}
                      </span>
                    </div>
                    <div className="border-b-2 border-[#D9D9D9a3] w-full">
                      <span className=" flex flex-col mb-3 font-bold text-2xl text-[#53545C] text-center">
                        Valor del envío
                      </span>
                      <span className="mb-3 font-light text-xl text-black flex w-full justify-center">
                        Gratis
                      </span>
                    </div>
                    <div className="border-b-2 border-[#D9D9D9a3] w-full">
                      <h1 className="mb-3 font-bold text-2xl text-[#53545C] flex w-full justify-center">
                        Detalles
                      </h1>
                      <span className="text-black font-light text-xl flex w-full justify-center">
                        Variaciones: {variation}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                disabled={isSubmitting}
                type="submit"
                className="btn-success my-6"
              >
                Finalizar Compra
              </button>
            </form>
          </motion.div>
        )}

        {move === true && (
          <motion.div
            initial={{ x: 1 >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}>

            <div className="h-screen flex items-center">
                <CompletePay/>
            </div>

          </motion.div>
        )}
      </div>
    </>
  );
}
