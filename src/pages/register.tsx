import { NavBar } from "@/components/ui/Navbar";
import React, { FC, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Layout } from "@/components/layouts/Layout";
import { useSearchParams } from "next/navigation";
import { dataApi } from "../../api";
import UserModal from "@/components/Modal/UserModal";

interface FormularioProps {}

interface FormData {
  name: string;
  email: string;
  surname: string;
  phone: number;
  cedula: number;
  password: string;
  /*confirmPassword: string;
  aceptaTerminos: boolean;*/
}

const Register: FC<FormularioProps> = () => {
  const searchParams = useSearchParams();
  const user_id = searchParams.get("userID");
  const [open, setOpen] = useState<boolean>(false);
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
      surname: "",
      cedula: 0,
      phone: 0,
      password: "",
      /*confirmPassword: "",
      aceptaTerminos: false,*/
    },
  });

  const password = useRef<string | null>(null);
  password.current = watch("password", "");

  const handlePositiveUser = () => {
    setOpen(true);
  };

  const onSubmit = handleSubmit(async (data) => {
    const referred_by = user_id;
    const newData = { ...data, referred_by };
    try {
      const response = await dataApi.post<any>("/users/be-an-star", newData);

      // Maneja la respuesta según tus necesidades
      if (response.status === 200) {
        console.log("Solicitud POST exitosa");
        console.log("Se creo el usuario");
        handlePositiveUser();
      } else {
        console.error("Error en la solicitud POST");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
    reset();
  });

  return (
    <Layout title="Checkout Estrellas">
      <>
        <form onSubmit={onSubmit}>
          <div
            className="flex flex-col bg-[#E7ECEF]
           h-screen justify-center items-center "
          >
            <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg justify-evenly shadow  w-full 2xl:max-w-[876px] xl:max-w-[876px] lg:max-w-[876px] max-w-[680px] px-5">
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
                  placeholder="Nombres "
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
                  placeholder="Apellidos "
                  {...register("surname", {
                    required: {
                      value: true,
                      message: "surname es requerido",
                    },
                    maxLength: {
                      value: 40,
                      message: "surname no debe ser mayor a 40 caracteres",
                    },
                    minLength: {
                      value: 2,
                      message: "surname debe ser mayor a 2 caracteres",
                    },
                  })}
                />
                {errors.surname?.type === "required" && (
                  <span>surname requerido</span>
                )}
                {errors.surname?.type === "maxLength" && (
                  <span>surname no debe ser mayor a 20 caracteres</span>
                )}
                {errors.surname?.type === "minLength" && (
                  <span>surname debe ser mayor a 2 caracteres</span>
                )}
              </div>

              <div className="relative text-black mb-7 w-full 2xl:max-w-[533px] xl:max-w-[533px] max-w-[503px]">
                <input
                  type="number"
                  className="bg-Form-input px-4 w-full pl-8"
                  placeholder="Cedula"
                  {...register("cedula", {
                    required: {
                      value: true,
                      message: "cedula requerida",
                    },
                  })}
                />
                {errors.cedula && <span>{errors.cedula.message}</span>}
              </div>

              <div className="relative text-black mb-7 w-full 2xl:max-w-[533px] xl:max-w-[533px] max-w-[503px]">
                <input
                  type="phone"
                  className="bg-Form-input px-4 w-full pl-8"
                  placeholder="Celular"
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Celular requerido",
                    },
                  })}
                />
                {errors.phone && <span>{errors.phone.message}</span>}
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

              <div className="mb-8">
                <span className="text-center font-normal text-sm text-[#8B8D97] ">
                  ¿Ya tienes una cuenta?{" "}
                  <b className="text-[#42E083]">Ingresar</b>
                </span>
              </div>

              <button
                className="btn-success flex text-center items-center justify-center h-[44px] mb-16 w-full 2xl:max-w-[533px] xl:max-w-[533px] sm:max-w-[403px] max-w-[232px]"
                type="submit"
              >
                Crear Cuenta
              </button>
            </div>
            <UserModal isOpen={open} onClose={() => setOpen(false)}>
              <div className="flex items-center justify-center flex-col">
                <div className="pb-3">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.8216 5.18L10.6153 16.6L6.45103 12.36L7.83585 10.95L10.6153 13.78L20.4367 3.78L21.8216 5.18ZM19.651 10.22C19.7787 10.79 19.8573 11.39 19.8573 12C19.8573 16.42 16.3412 20 12.0001 20C7.65907 20 4.143 16.42 4.143 12C4.143 7.58 7.65907 4 12.0001 4C13.5519 4 14.9859 4.46 16.2037 5.25L17.618 3.81C16.0269 2.67 14.0921 2 12.0001 2C6.57871 2 2.17871 6.48 2.17871 12C2.17871 17.52 6.57871 22 12.0001 22C17.4216 22 21.8216 17.52 21.8216 12C21.8216 10.81 21.6055 9.67 21.2323 8.61L19.651 10.22Z"
                      fill="#53545C"
                    />
                  </svg>
                </div>
                <span className="text-xl font-normal text-black text-center">
                  ¡Felicidades!
                </span>
                <br />
                <span className="text-base font-normal text-black text-center pb-10 px-6">
                  Has creado tu cuenta en estrellas de manera exitosa
                </span>
              </div>
            </UserModal>
          </div>
        </form>
      </>
    </Layout>
  );
};

export default Register;
