import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SimpleCatalog } from "../../../interfaces";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleCatalog } from "@/store/catalog/catalogs";

interface Props {
  catalogs: SimpleCatalog;
}

export default function ProductCard(catalog: Props) {
  const [cantidad, setCantidad] = useState(0);
  const dispatch = useAppDispatch();

  // Actualizar la cantidad cuando cambia el catálogo
  useEffect(() => {
    setCantidad(catalog.catalogs.quantity || 1);
  }, [catalog.catalogs.id]); 

  const addCount = () => {
    const newCantidad = cantidad + 1;
    setCantidad(newCantidad);
    onToggle(catalog.catalogs.id, catalog.catalogs.name, catalog.catalogs.description, newCantidad, catalog.catalogs.price, catalog.catalogs.thumbnail, catalog.catalogs.variations);
  };

  // Función para restar al valor
  const subtractCount = () => {
    if (cantidad > 1) {
      const newCantidad = cantidad - 1;
      setCantidad(newCantidad);
      onToggle(catalog.catalogs.id, catalog.catalogs.name, catalog.catalogs.description, newCantidad, catalog.catalogs.price, catalog.catalogs.thumbnail, catalog.catalogs.variations);
    }
  };

  const onToggle = (
    id: string,
    name: string,
    description: string,
    quantity: number,
    price: number,
    thumbnail: string,
    variations: any
  ) => {
    const catalog = { id, name, description, quantity, price, thumbnail, variations };
    console.log(catalog);
    dispatch(toggleCatalog(catalog));
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
          <div className="lg:ml-[-10px] sm:w-[200px] w-[175px] truncate">
            <span className="pt-2 text-base font-medium text-[#3D3D3F] capitalize truncate ">
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
              <button onClick={subtractCount}>-</button>
              <span>{cantidad}</span>
              {/* Botón para restar */}
              <button onClick={addCount}>+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
