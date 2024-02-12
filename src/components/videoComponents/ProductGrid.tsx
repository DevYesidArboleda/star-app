import React from "react";
import { SimpleCatalog } from "../../../interfaces";
import ProductCard from "./ProductCard";
import { useAppSelector } from "@/store";
import { useDispatch } from "react-redux";
import { resetCatalog } from "@/store/catalog/catalogs";

interface Props {
  catalog: SimpleCatalog[];
}

export default function ProductGrid({ catalog }: Props) {
  const allProduct = useAppSelector((state) => Object.values(state.catalogo));
  console.log("este es aja", allProduct);
  const addAll = allProduct.reduce(
    (total, elemento) => total + elemento.price,
    0
  );

  const dispatch = useDispatch();

  const handleLimpiarCatalogo = () => {
    dispatch(resetCatalog());
  };

  return (
    <div className="flex flex-wrap gap-10 items-center justify-center">
      <div className="flex flex-col mx-auto right-0 w-full mt-4 gap-4">
        <div className="flex flex-col bg-white rounded-2xl overflow-hidden p-4 [&>*:last-child]:border-b-0 [&>*:first-child]:border-b-0 [&>*]:border-b-2  border-[#BBC1CA6B]">
          <div className="flex justify-between mb-3">
            <span className="text-[#53545C] text-base">
              {allProduct.length} items
            </span>
            <span onClick={handleLimpiarCatalogo} className="text-[#F57E77] text-[13px]">Limpiar carrito</span>
          </div>

          {catalog.map((cat) => (
            <ProductCard key={cat.id} catalogs={cat} />
          ))}
        </div>

        <div className="flex flex-col bg-white rounded-2xl overflow-hidden p-4">
          <div className="text-[#53545C] text-base flex justify-between border-b-1 border-[#BBC1CA6B] py-3">
            <span>Items totales</span>
            <span className="">{allProduct.length}</span>
          </div>
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
    </div>
  );
}
