import { NavBar } from "@/components/ui/Navbar";
import React, { FC, useRef } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Layout } from "@/components/layouts/Layout";
import { useSearchParams } from "next/navigation";

interface FormularioProps {}

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  aceptaTerminos: boolean;
}

const Register: FC<FormularioProps> = () => {  
  const searchParams = useSearchParams();
  const product_id = searchParams.get("productID");
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
    <Layout title="Checkout Estrellas">
      <>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col bg-[#E7ECEF]
           h-screen justify-center items-center ">
            <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg justify-evenly shadow  w-full 2xl:max-w-[876px] xl:max-w-[876px] lg:max-w-[876px] max-w-[680px]">
              <div className="py-[22px] px-[40px] md:py-[14px] md:px-[161px]">
                <Image
                  src="/logoStar.svg"
                  width={140}
                  height={140}
                  alt="Logo Star"
                  priority={true}
                />
              </div>
              <div className="flex flex-col pb-[60px]">
                <span className="px-[34px] text-black font-medium text-center text-xl">
                  Empieza a generar ventas con{" "}
                  <b className="text-[#42E083] font-medium">Estrellas</b>
                </span>
              </div>
              <div className="relative  mb-7 w-full 2xl:max-w-[533px] xl:max-w-[533px] max-w-[503px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="pointer-events-none w-4 h-4 absolute top-1/2 transform -translate-y-1/2 left-3"
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.98481 13.3462C4.11719 13.3462 0.814331 13.931 0.814331 16.2729C0.814331 18.6148 4.09624 19.2205 7.98481 19.2205C11.8524 19.2205 15.1543 18.6348 15.1543 16.2938C15.1543 13.9529 11.8734 13.3462 7.98481 13.3462Z"
                    stroke="#6E7079"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.98477 10.0059C10.5229 10.0059 12.58 7.94779 12.58 5.40969C12.58 2.8716 10.5229 0.814453 7.98477 0.814453C5.44667 0.814453 3.38858 2.8716 3.38858 5.40969C3.38001 7.93922 5.42382 9.99731 7.95239 10.0059H7.98477Z"
                    stroke="#6E7079"
                    strokeWidth="1.42857"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  type="text"
                  className="bg-Form-input px-4 w-full pl-8"
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

              <div className="relative text-black mb-7 w-full 2xl:max-w-[533px] xl:max-w-[533px] max-w-[503px]">
                <svg
                  width="23"
                  height="20"
                  viewBox="0 0 23 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="pointer-events-none w-4 h-4 absolute top-1/2 transform -translate-y-1/2 left-3"
                >
                  <path
                    d="M17.4026 6.85107L12.9593 10.4641C12.1198 11.1301 10.9387 11.1301 10.0992 10.4641L5.61841 6.85107"
                    stroke="#6E7079"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.4089 19C19.4502 19.0084 21.5 16.5095 21.5 13.4384V6.57001C21.5 3.49883 19.4502 1 16.4089 1H6.59114C3.54979 1 1.5 3.49883 1.5 6.57001V13.4384C1.5 16.5095 3.54979 19.0084 6.59114 19H16.4089Z"
                    stroke="#6E7079"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <input
                  type="email"
                  className="bg-Form-input px-4 w-full pl-8"
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

              <div className="relative text-black mb-7 w-full 2xl:max-w-[533px] xl:max-w-[533px] max-w-[503px]">
                <svg
                  width="23"
                  height="20"
                  viewBox="0 0 23 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="pointer-events-none w-4 h-4 absolute top-1/2 transform -translate-y-1/2 left-3"
                >
                  <path
                    d="M13.4235 7.44756V5.30056C13.4235 2.78756 11.3855 0.749556 8.87249 0.749556C6.35949 0.738556 4.31349 2.76656 4.30249 5.28056V5.30056V7.44756"
                    stroke="#5E6366"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.6832 19.2495H5.04224C2.94824 19.2495 1.25024 17.5525 1.25024 15.4575V11.1685C1.25024 9.07346 2.94824 7.37646 5.04224 7.37646H12.6832C14.7772 7.37646 16.4752 9.07346 16.4752 11.1685V15.4575C16.4752 17.5525 14.7772 19.2495 12.6832 19.2495Z"
                    stroke="#5E6366"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.86292 12.2026V14.4236"
                    stroke="#130F26"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  type="password"
                  className="bg-Form-input px-4 w-full pl-8"
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

              <div className="relative text-black mb-7 w-full 2xl:max-w-[533px] xl:max-w-[533px] max-w-[503px]">
                <svg
                  width="23"
                  height="20"
                  viewBox="0 0 23 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="pointer-events-none w-4 h-4 absolute top-1/2 transform -translate-y-1/2 left-3"
                >
                  <path
                    d="M13.4235 7.44756V5.30056C13.4235 2.78756 11.3855 0.749556 8.87249 0.749556C6.35949 0.738556 4.31349 2.76656 4.30249 5.28056V5.30056V7.44756"
                    stroke="#5E6366"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.6832 19.2495H5.04224C2.94824 19.2495 1.25024 17.5525 1.25024 15.4575V11.1685C1.25024 9.07346 2.94824 7.37646 5.04224 7.37646H12.6832C14.7772 7.37646 16.4752 9.07346 16.4752 11.1685V15.4575C16.4752 17.5525 14.7772 19.2495 12.6832 19.2495Z"
                    stroke="#5E6366"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.86292 12.2026V14.4236"
                    stroke="#130F26"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  type="password"
                  className="bg-Form-input px-4 w-full pl-8"
                  placeholder="Confirmar contraseña"
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "Confirmar contraseña es requerida",
                    },
                    minLength: {
                      value: 6,
                      message:
                        "Confirmar contraseña debe ser mayor a 6 caracteres",
                    },
                    validate: (value) =>
                      value === password.current ||
                      "Las contraseñas no coinciden",
                  })}
                />
                {errors.confirmPassword && (
                  <span>{errors.confirmPassword.message}</span>
                )}
              </div>

              <div className="flex flex-row text-black mb-7 w-full 2xl:max-w-[533px] xl:max-w-[533px] max-w-[503px]">
                <input
                  type="checkbox"
                  {...register("aceptaTerminos", {
                    required: {
                      value: true,
                      message: "Acepta los términos y condiciones",
                    },
                  })}
                />
                <div className="flex flex-col">
                  <label className="">Acepto los términos y condiciones</label>
                  {errors.aceptaTerminos && (
                    <span className="text-red-500">
                      {errors.aceptaTerminos.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-8">
                <span className="text-center font-normal text-sm text-[#8B8D97] ">
                  ¿Ya tienes una cuenta?{" "}
                  <b className="text-[#42E083]">Ingresar</b>
                </span>
              </div>

              <button className="btn-success mb-7" type="submit">
                Crear Cuenta
              </button>
            </div>
          </div>
        </form>
      </>
    </Layout>
  );
};

export default Register;
