import Link from "next/link";
import React, { useState } from "react";
import { SimpleCatalog } from "../../../interfaces";
import { useAppSelector } from "@/store";

interface Props {
  catalogs: SimpleCatalog;
}

export default function ProductCard(catalog: Props) {
  const [valor, setValor] = useState(0);

  // Función para sumar al valor
  const addCount = () => {
    setValor(valor + 1);
  };

  // Función para restar al valor
  const subtractCount = () => {
    setValor(valor - 1);
  };

  console.log("aja", catalog);
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
          {catalog.catalogs.variations.length === 0 ? (
            <div>
            </div>
          ) : (
            <div className="">
              <button className="text-white text-xs p-2 bg-[#F6A97D] rounded-md">
                Modificar
              </button>
            </div>
          )}
          <div>
            <div className="text-[#53545C] bg-[#42E18478] rounded-3xl w-[80px] h-7 items-center flex justify-center gap-3 text-xl">
              {/* Botón para sumar */}
              <button onClick={addCount}>+</button>
              <span>{valor}</span>
              {/* Botón para restar */}
              <button onClick={subtractCount}>-</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
