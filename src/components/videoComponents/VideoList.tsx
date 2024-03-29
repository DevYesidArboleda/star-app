"use client";

import { createRef, useEffect, useRef, useState } from "react";
import { useGetFeedVideos } from "../../hooks/useGetFeedVideos";
import Video from "./Video";
import Image from "next/image";
import catalogs, { toggleCatalog } from "@/store/catalog/catalogs";
import { useAppDispatch, useAppSelector } from "@/store";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Lottie from "lottie-react";
import Lottie2 from "react-lottie";
import animationData from "../../../public/animations/addProductAnimation.json";
import animationData2 from "../../../public/animations/testAnimation.json";
import animationData3 from "../../../public/animations/animationBuyNow.json";
import ProductGrid from "./ProductGrid";
import ModalCart from "../Modal/ModalCart";
import ListProduct from "./ListProduct";
import ModalForm from "../Modal/ModalForm";
import FormCatalog from "./FormCatalog";
import Modal from "../Modal/Modal";
import Loading from "../loading/Loading";

export default function VideoList() {
  const [videos, setVideos] = useState<any>();
  const [posicionActual, setPosicionActual] = useState<number | null>(null);
  const [posicionesCapturadas, setPosicionesCapturadas] = useState<number[]>(
    []
  );
  const searchParams = useSearchParams();
  const catalog_id = searchParams.get("catalogueID") || "";
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModalInfo = () => {
    setOpenModal(true);
  };

  const handleCloseModalInfo = () => {
    setOpenModal(false);
  };

  const dispatch = useAppDispatch();

  const addProduct = useAppSelector((state) => Object.values(state.catalogo));
  console.log("asa", addProduct);
  const handleBotonClick = (index: number) => {
    setPosicionActual(index);

    if (videos && videos.length > 0 && index < videos.length) {
      const videoSeleccionado: any = videos[index];
      console.log("Video seleccionado:", videoSeleccionado);
      setPosicionesCapturadas((prevPosiciones: any) => [
        ...prevPosiciones,
        videoSeleccionado.externalId,
      ]);
    } else {
      console.error("La posición actual no es válida");
    }
  };

  const handleBorrarClick = (index: number) => {
    setPosicionesCapturadas((prevPosiciones) =>
      prevPosiciones.filter((pos) => pos !== videos[index].externalId)
    );
  };

  console.log(posicionesCapturadas);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useGetFeedVideos(catalog_id).then((videos) => setVideos(videos));
  }, []);

  const onToggle = (
    id: string,
    name: string,
    description: string,
    price: number,    
    quantity: number,
    thumbnail: string,
    variations: any
  ) => {
    const catalog = { id, name, description, quantity, price, thumbnail, variations };
    console.log(catalog);

    if (addProduct.some((pos) => pos.id === id)) {
      console.log("La posicion ya existe", id);
    } else {
      dispatch(toggleCatalog(catalog));
    }
  };

  const offToggle = (
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

    if (addProduct.some((pos) => pos.id === id)) {
      dispatch(toggleCatalog(catalog));
      console.log("Se encontró el elemento con id ", id);
    } else {
      console.error("La posición actual no es válida");
    }
  };

  //carrito abrir y cerrar
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //Formulario abrir y cerrar
  const [isModalOpenForm, setIsModalOpenForm] = useState(false);

  const handleOpenModalForm = () => {
    setIsModalOpenForm(true);
  };

  const handleCloseModalForm = () => {
    setIsModalOpenForm(false);
  };

  const handleFormSubmit = (data: any) => {
    // Lógica de manejo de datos del formulario
    console.log("Datos del formulario:", data);
  };

  //metodo para scroll
  const videoContainerRef = useRef<HTMLDivElement>(null);
const [currentIndex, setCurrentIndex] = useState<number>(0);

const handleButtonClick = (direction: "up" | "down") => {
  const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

  console.log("newIndex:", newIndex);

  if (newIndex >= 0 && newIndex < videos.length && videoContainerRef.current) {
    setCurrentIndex(newIndex);

    const targetVideo = videoContainerRef.current.children[newIndex] as HTMLDivElement | undefined;

    console.log("targetVideo:", targetVideo);

    if (targetVideo) {
      targetVideo.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
};

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData3,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      {videos !== "false" ? (
        <>
          <main className="overflow-hidden md:relative bg-black text-white max-w-sm w-full h-screen mx-auto md:mx-0 text-xs">
            <section
              className="pb-14 h-full absolute top-0 right-0 left-0 flex flex-col snap-y snap-mandatory overflow-y-auto videoScroll "
              ref={videoContainerRef}
            >
              {!videos
                ? "Loading..."
                : // @ts-ignore
                  videos.map((video, index) => {
                    return (
                      <div
                        className="flex flex-row-reverse items-center relative"
                        key={index}
                        style={{ scrollSnapAlign: "start" }}
                      >
                        <Video
                          src={video.videoUrl}
                          name={video.name}
                          price={video.price}
                          thumbnail={video.thumbnai}
                        />
                        <button
                          onClick={() =>
                            onToggle(
                              video.externalId,
                              video.name,
                              video.description,                              
                              video.price,
                              1,
                              video.thumbnail,
                              video.variations
                            )
                          }
                          className="text-white absolute bottom-[145px] mb-6 w-16 "
                        >
                          <Lottie animationData={animationData} />
                          <span className="flex justify-center text-white text-[10px] text-center font-bold mt-[-5px]">
                            Agregar
                          </span>
                        </button>

                        <div
                          onClick={handleOpenModal}
                          className="absolute rounded-full p-2 flex items-center bg-white cursor-pointer rigth-0 top-4 mr-4 lg:hidden"
                        >
                          <Image
                            src="/img/cart.png"
                            alt=""
                            width={20}
                            height={20}
                          />
                          <span className="absolute ml-3 mb-5 mr-2 rounded-full py-[2px] px-[6px] bg-[#F57E77] text-white">
                            {addProduct.length}
                          </span>
                        </div>

                        <ModalCart
                          isOpen={isModalOpen}
                          onClose={handleCloseModal}
                        >
                          <ListProduct />
                        </ModalCart>

                        {/*<button
                  onClick={() => offToggle(video.externalId, video.name)}
                  className="text-white absolute mt-5"
                >
                  <Image src="/img/borrar.png" alt="" width={32} height={32} />
                </button>*/}

                        <div className="info-overlay absolute bottom-[160px] left-0 right-0 w-[80%]">
                          <div className="flex w-[75%]  bg-[#21181a91] py-2 items-center flex-row pl-3 rounded-r-full border-l-0 border-1 border-[#dad2d250] border-spacing-2 border-sh shadow-sm shadow-[#DAD2D2AD]">
                            <div className="rounded-full border-[#42E184] border-2 ">
                              <img
                                className="h-12 w-12 rounded-full object-cover"
                                src={video.thumbnail}
                                alt={`${video.name} thumbnail`}
                              />
                            </div>

                            <div className="flex-1 pl-4">
                              <div className="text-white text-sm pb-2">
                                <span>
                                  Precio:{" "}
                                  <span className="">
                                    $
                                    {new Intl.NumberFormat().format(
                                      video.price
                                    )}
                                  </span>
                                </span>
                              </div>
                              <div className="w-full h-[2px] bg-white"></div>
                              <div style={{ paddingTop: 8 }}>
                                <span className="text-[#42E184] font-semibold text-base">
                                  Envío: GRATIS
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className={`mt-[-140px] `}>
                        <button
                          onClick={() => handleButtonClick("up")}
                          disabled={currentIndex === 0}
                          className={`absolute right-0 cursor-pointer mr-4 mb-12 ${currentIndex === 0 ? "hidden" : ""}`}
                        >
                          <Image
                            src="/img/ScrollUp.svg"
                            alt=""
                            width={32}
                            height={32}
                          />
                        </button>

                        <button
                          onClick={() => handleButtonClick("down")}
                          disabled={currentIndex === videos.length - 1}
                          className={`absolute right-0 mt-14 cursor-pointer mr-4`}
                        >
                          <Image
                            src="/img/ScrollUp.svg"
                            alt=""
                            width={32}
                            height={32}
                            className={`rotate-[180deg] ${currentIndex === videos.length - 1 ? "hidden" : ""}`}
                          />
                        </button>
                        </div>

                        <div className="absolute px-4 flex items-center bg-grey-light cursor-pointer left-0 top-1 h-16">
                          <div className="rounded-full bg-gradient-to-r from-[#42E083] via-yellow-500 to-[#FF8A00] p-[2px]">
                            <div>
                              <img
                                className="h-12 w-12 rounded-full object-cover"
                                src={video.thumbnail}
                                alt={`${video.name} overlay thumbnail`}
                              />
                            </div>
                          </div>
                          <div className="ml-4 flex-1 py-4">
                            <div className="flex items-bottom justify-between">
                              <p className="text-grey-darkest whitespace-nowrap overflow-hidden overflow-ellipsis">
                                {video.name}
                              </p>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={handleOpenModalInfo}
                          className="right-0 text-white absolute bottom-[220px] mb-6 mr-4"
                        >
                          <Image
                            src="/img/infoProduct.png"
                            alt=""
                            width={32}
                            height={32}
                          />
                        </button>

                        <Modal
                          isOpen={openModal}
                          onClose={handleCloseModalInfo}
                        >
                          {/* Contenido del modal */}
                          <div className="flex flex-col mt-[-20px] z-[1]">
                            <span className="text-base font-bold text-black mb-5">
                              {video.name}
                            </span>
                            <span className="text-sm font-normal text-black">
                              {video.description}
                            </span>
                          </div>
                        </Modal>

                        {addProduct.length !== 0 ? (
                          <div
                            className="fixed bottom-0 md:w-[384px] w-full h-[84px] text-2xl font-bold text-[#53545C] flex justify-center"
                            data-ripple-light="true"
                            onClick={handleOpenModalForm}
                          >
                            <button className="button">¡Comprar Ahora!</button>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
            </section>
            <ModalForm isOpen={isModalOpenForm} onClose={handleCloseModalForm}>
              <FormCatalog onSubmit={handleFormSubmit} />
            </ModalForm>
          </main>
          <div className="lg:flex md:items-start xl:w-[398px] lg:w-[398px] md:hidden hidden">
            <ProductGrid catalog={addProduct} />
          </div>
        </>
      ) : (
        <>
          <Loading>
            <div className="flex items-center justify-center h-screen">
              <div className="bg-white border-gray-200 rounded-lg flex flex-col justify-center items-center gap-2 p-6">
                <Image src="/img/task_alt.svg" alt="" width={48} height={48} />
                <span className="text-green-400 text-xl text-center">
                  Por favor contacta con tu vendedor
                </span>
                <span className="text-black text-base font-medium">
                  Información no válida.
                </span>
              </div>
            </div>
          </Loading>
        </>
      )}
    </>
  );
}
