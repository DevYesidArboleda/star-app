"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/store";
import ProductCardPay from "./ProductCardPay";

export const PayCatalog = () => {
  const searchParams = useSearchParams();
  const user_id = searchParams.get("userID");
  const allProduct = useAppSelector((state) => Object.values(state.catalogo));
  const addAll = allProduct.reduce(
    (total, elemento) => total + elemento.price,
    0
  );

  return (
    <div className="flex items-start justify-center pt-6 gap-8">
      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg justify-evenly shadow  mx-3 max-w-[366px] md:max-w-[508px]">
        <div className="">
          <Image
            src="/img/thanksPay.png"
            width={508}
            height={451}
            alt="Logo Star"
            className="rounded-lg "
            priority={true}
          />
        </div>
        <div className="">
          <h1 className="text-black font-bold text-center lg:px-10 lg:pt-6  lg:text-base text-base leading-6 px-4  md:pt-6 md:pb-5 pb-7 pt-8">
            Has realizado tu compra de manera{" "}
            <b className="text-[#42E184] font-normal">exitosa</b>, en tu correo
            está el resumen de tu pedido
          </h1>
        </div>
        <div>
          <h1 className="text-[#53545C] xl:text-xs text-center xl:px-24 md:px-20 lg:pt-8 lg:pb-[30px] sm:py-[24px] pb-9 px-10 sm:text-xs text-xs leading-5">
            ¡Únete a nuestra comunidad de estrellas y genera ventas con
            productos de nuestros catálogos!
          </h1>
        </div>
        <div className="md:pb-[46px] pb-20">
          <button className="btn-success  h-[47px] w-full min-w-[268px] text-base text-[#53545C]">
            <Link href={`/register?userID=${user_id}`}>
              Quiero ser una estrella
            </Link>
          </button>
        </div>
      </div>

      <div className="lg:flex hidden flex-col bg-white rounded-2xl overflow-hidden p-4 [&>*:last-child]:border-b-0 [&>*:first-child]:border-b-0 [&>*]:border-b-2  border-[#BBC1CA6B] w-[398px]">
        <div className="text-[#53545C] text-base flex justify-between border-b-1 border-[#BBC1CA6B] py-3">
          <span>{allProduct.length} Items </span>
        </div>
            {allProduct.map((cat) => (
                <ProductCardPay key={cat.id} catalogs={cat} />
              ))}
        <div className="flex flex-col gap-3 py-3">
          <div className="flex flex-row justify-between">
            <span className="text-[#53545C] text-base">Envío</span>
            <span className="text-[#2FCB70] text-base">GRATIS</span>
          </div>
          <div className="flex flex-row justify-between text-[#53545C] text-base font-semibold">
            <span className=" ">Valor total</span>
            <span className="">${new Intl.NumberFormat().format(addAll)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
