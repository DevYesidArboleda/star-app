import Link from "next/link";
import React, { useState } from "react";
import { SimpleCatalog } from "../../../interfaces";
import { useAppSelector } from "@/store";

interface Props {
  catalogs: SimpleCatalog;
}

export default function ProductCardPay(catalog: Props) {
  const [valor, setValor] = useState(0);

  // Función para sumar al valor
  const addCount = () => {
    setValor(valor + 1);
  };

  // Función para restar al valor
  const subtractCount = () => {
    setValor(valor - 1);
  };

  return (
    <div className="mx-auto right-0 w-full  ">
      <div className="flex flex-col bg-white py-4">
        <div className="flex flex-row w-full justify-between">
          <div>
            <img
              className="h-12 w-12 rounded-md"
              src={catalog.catalogs.thumbnail}
              alt={`${catalog.catalogs.name} thumbnail`}
            />
          </div>
          <div className="ml-[-46px]">
            <span className="pt-2 text-base font-medium text-[#3D3D3F] capitalize">
              {catalog.catalogs.name}
            </span>
          </div>
          <div className="">
            <span className="pt-2 text-base font-medium text-[#53545C] ">
              $ {new Intl.NumberFormat().format(catalog.catalogs.price)}
            </span>
          </div>
        </div>
        <div className="flex justify-between w-full mt-4">          
        </div>
      </div>
    </div>
  );
}
