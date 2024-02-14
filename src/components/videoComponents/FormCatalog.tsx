// FormularioPedido.tsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormDataSchema } from "../../../lib/schema";
import { fetchCity, fetchDeparment } from "../utils/funtions";

interface FormularioPedidoProps {
  onSubmit: (data: any) => void;
}

type Inputs = z.infer<typeof FormDataSchema>;

const FormCatalog: React.FC<FormularioPedidoProps> = ({ onSubmit }) => {

    const [department, setDepartment] = useState<any>([]);
    const [city, setCity] = useState<any>([]);
    const [cityid, setCityid] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  const processForm = async (data: any) => {
    // Tu lógica de procesamiento del formulario aquí
    onSubmit(data);
  };

  useEffect(() => {
    fetchDeparment().then((e) => {
      setDepartment(e);
    });
  }, []);

  const handleInputDeparment = (e: any) => {
    let index = e.target.selectedIndex;
    setCityid(e.target.options[index].value);
  };

  useEffect(() => {
    if (cityid !== 0) {
      fetchCity(cityid).then((e: any) => {
        setCity(e);
      });
    }
  }, [cityid]);

  return (
    <div className="px-[16.5px] lg:py-[49.5px] md:py-[20.5px] lg:w-1/4 bg-Form w-[57%] max-w-[408px]">
      {/* ... (resto del código del formulario) ... */}
      <form onSubmit={handleSubmit(processForm)}>
        {/* ... (resto de tus campos de entrada) ... */}
        <div className="flex w-full lg:hidden pt-8 items-center justify-center">
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
                {(errors.city?.message ) && (
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
                  //onChange={handleInputNote}
                />
              </div>
            </div>
          </div>
          <div className="flex w-full lg:hidden pt-8 items-center justify-center">
            <button
              className="btn-success md:w-full"
              type="submit"
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormCatalog;
