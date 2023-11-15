import { Header } from "@/components/Header";
import React, { FC, useRef } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

interface FormularioProps {}

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  aceptaTerminos: boolean;
}

const Register: FC<FormularioProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      aceptaTerminos: false,
    },
  });

  const password = useRef<string | null>(null);
  password.current = watch("password", "");

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    reset();
  });

  return (
    <>
    <Header/>
    <form onSubmit={onSubmit}>
      <div className="flex flex-col bg-[#E7ECEF] w-screen h-screen justify-center items-center">
        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg justify-evenly shadow  ">
            <div className="py-[44px] px-[161px]">
                <Image
                    src="/logoStar.svg"
                    width={140}
                    height={140}
                    alt="Logo Star"
                    priority={true}
                />
            </div>
            <div className="flex flex-col pb-[60px]">
                <span className="px-[34px] text-black font-medium text-center">Empieza a generar ventas con <b className="text-[#42E083] font-medium">Estrellas</b></span>
                <span className="text-center text-[#8B8D97] text-sm font-normal">Crea una cuenta</span>
            </div>
          <div className=" text-black mb-7">
            <input
              type="text"
              className="bg-Form-input "
              placeholder="Nombre Completo"
              {...register("name", {
                required: {
                  value: true,
                  message: "name es requerido",
                },
                maxLength: {
                  value: 40,
                  message: "name no debe ser mayor a 40 caracteres",
                },
                minLength: {
                  value: 2,
                  message: "name debe ser mayor a 2 caracteres",
                },
              })}
            />
            {errors.name?.type === "required" && (
              <span>name requerido</span>
            )}
            {errors.name?.type === "maxLength" && (
              <span>name no debe ser mayor a 20 caracteres</span>
            )}
            {errors.name?.type === "minLength" && (
              <span>name debe ser mayor a 2 caracteres</span>
            )}
          </div>

          <div className=" text-black mb-7">
            <input
              type="email"
              className="bg-Form-input "
              placeholder="Correo Electronico"
              {...register("email", {
                required: {
                  value: true,
                  message: "email es requerido",
                },
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "email no válido",
                },
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          

          <div className=" text-black mb-7">
            <input
              type="password"
              className="bg-Form-input "
              placeholder="Crea una contraseña"
              {...register("password", {
                required: {
                  value: true,
                  message: "Contraseña es requerida",
                },
                minLength: {
                  value: 6,
                  message: "Contraseña debe ser mayor a 6 caracteres",
                },
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>

          <div className=" text-black mb-7">
            <input
              type="password"
              className="bg-Form-input "
              placeholder="Confirmar contraseña"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Confirmar contraseña es requerida",
                },
                minLength: {
                  value: 6,
                  message: "Confirmar contraseña debe ser mayor a 6 caracteres",
                },
                validate: (value) =>
                  value === password.current || "Las contraseñas no coinciden",
              })}
            />
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message}</span>
            )}
          </div>

          <div className="flex  text-black mb-7">
            <input
              type="checkbox"
              {...register("aceptaTerminos", {
                required: {
                  value: true,
                  message: "Acepta los términos y condiciones",
                },
              })}
            />
            <label>Acepto los términos y condiciones</label>
            {errors.aceptaTerminos && (
              <span>{errors.aceptaTerminos.message}</span>
            )}
          </div>

          <button className="btn-success mb-7" type="submit">
          Crear Cuenta
          </button>

          <pre className="text-black" style={{ width: "400px" }}>
            {JSON.stringify(watch(), null, 2)}
          </pre>
        </div>
      </div>
    </form>
    </>
  );
};

export default Register;
