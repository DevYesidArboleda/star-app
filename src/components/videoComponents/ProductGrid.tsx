import React, { useState } from "react";
import { SimpleCatalog } from "../../../interfaces";
import ProductCard from "./ProductCard";
import { useAppSelector } from "@/store";
import { useDispatch } from "react-redux";
import { resetCatalog } from "@/store/catalog/catalogs";
import Image from "next/image";
import Lottie from "lottie-react";
import animationData from "../../../public/animations/shimmerCarritoDeCompra.json";
import { button } from "@nextui-org/react";
import FormCatalog from "./FormCatalog";
import ModalForm from "../Modal/ModalForm";
import { UseWindowSize } from "@/hooks/UseWindowSize";

interface Props {
  catalog: SimpleCatalog[];
}

export default function ProductGrid({ catalog }: Props) {
  const allProduct = useAppSelector((state) => Object.values(state.catalogo));
  const windowSize = UseWindowSize();
  console.log("este es aja", allProduct);
  const addAll = allProduct.reduce(
    (total, elemento) => total + elemento.price,
    0
  );

  const dispatch = useDispatch();

  const handleLimpiarCatalogo = () => {
    dispatch(resetCatalog());
  };

  //carrito abrir y cerrar
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (data: any) => {
    // Lógica de manejo de datos del formulario
    console.log("Datos del formulario:", data);
  };

  return (
    <>
      {windowSize.width >= 900 ? (
        <div className="flex flex-wrap gap-10 items-center justify-center xl:w-full lg:w-full md:w-full">
          <div className="flex flex-col mx-auto right-0 w-full mt-4 gap-4">
            <div className="flex flex-col bg-white rounded-2xl overflow-hidden p-4 [&>*:last-child]:border-b-0 [&>*:first-child]:border-b-0 [&>*]:border-b-2  border-[#BBC1CA6B]">
              <div className="flex justify-between mb-3">
                <span className="text-[#53545C] text-base">
                  {allProduct.length} items
                </span>
                <div>
                  <div className="justify-center rounded-full p-2 lg:flex items-center bg-white hidden ">
                    <Image src="/img/cart.png" alt="" width={25} height={25} />
                    <span className="absolute ml-6 mb-5 mr-0 rounded-full py-[2px] px-[7px] bg-[#F57E77] text-white text-xs">
                      {allProduct.length}
                    </span>
                  </div>
                  <span
                    onClick={handleLimpiarCatalogo}
                    className="text-[#F57E77] text-[13px]"
                  >
                    Limpiar carrito
                  </span>
                </div>
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
                  <span className="">
                    ${new Intl.NumberFormat().format(addAll)}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full">
              {allProduct.length !== 0 ? (
                <button
                  className=" bg-[#F6A97D] rounded-2xl w-full h-[54px] text-xl font-bold text-[#53545C]"
                  type="button"
                  onClick={handleOpenModal}
                >
                  Continuar con la compra
                </button>
              ) : (
                ""
              )}
            </div>
            <ModalForm isOpen={isModalOpen} onClose={handleCloseModal}>
              <FormCatalog onSubmit={handleFormSubmit} />
            </ModalForm>
          </div>
        </div>
      ) : (
        //Estructura tablets y mobiles
        <div className="flex flex-wrap gap-10 items-center justify-center xl:w-full lg:w-full md:w-full h-full">
          <div className="flex flex-col mx-auto right-0 w-full mt-4 h-full justify-between">
            <div className="flex flex-col bg-white rounded-2xl overflow-hidden p-4 [&>*:last-child]:border-b-0 [&>*:first-child]:border-b-0 [&>*]:border-b-2  border-[#BBC1CA6B] overflow-y-auto">
              <div className="flex justify-between mb-3">
                <span className="text-[#53545C] text-base">
                  {allProduct.length} items
                </span>
                <div>
                  <div className="justify-center rounded-full p-2 lg:flex items-center bg-white hidden ">
                    <Image src="/img/cart.png" alt="" width={25} height={25} />
                    <span className="absolute ml-6 mb-5 mr-0 rounded-full py-[2px] px-[7px] bg-[#F57E77] text-white text-xs">
                      {allProduct.length}
                    </span>
                  </div>
                  <span
                    onClick={handleLimpiarCatalogo}
                    className="text-[#F57E77] text-[13px]"
                  >
                    Limpiar carrito
                  </span>
                </div>
              </div>

              {catalog.map((cat) => (
                <ProductCard key={cat.id} catalogs={cat} />
              ))}
            </div>

            <div className="flex flex-col bg-white rounded-2xl overflow-hidden p-4 gap-4 pb-10">
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
                  <span className="">
                    ${new Intl.NumberFormat().format(addAll)}
                  </span>
                </div>
              </div>
              <div className="w-full">
                {allProduct.length !== 0 ? (
                  <button
                    className=" bg-[#F6A97D] rounded-lg w-full h-[54px] text-xl font-bold text-[#53545C]"
                    type="button"
                    onClick={handleOpenModal}
                  >
                    Continuar con la compra
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>

            <ModalForm isOpen={isModalOpen} onClose={handleCloseModal}>
              <FormCatalog onSubmit={handleFormSubmit} />
            </ModalForm>
          </div>
        </div>
      )}
    </>
  );
}
