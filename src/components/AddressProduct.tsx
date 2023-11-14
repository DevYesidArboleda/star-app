import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormDataSchema } from "../../lib/schema";

type Inputs = z.infer<typeof FormDataSchema>;

export const AddressProduct = ({ variation }: any) => {
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

  console.log("llego", variation);

  return (
    <div>
      <div className="px-[16.5px] py-[49.5px]">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Hacer Pedido
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Ingresa tus datos
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
              Fecha de entrega aproximada
            </label>
            <div className="mt-2">
              <input
                type="date"
                id="date"
                {...register("date")}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
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
        </div>
      </div>
    </div>
  );
};
