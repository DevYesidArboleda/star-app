"use client";

import { useEffect, useState } from "react";
import { useGetFeedVideos } from "../../hooks/useGetFeedVideos";
import Video from "./Video";
import Image from "next/image";
import catalogs, { toggleCatalog } from "@/store/catalog/catalogs";
import { useAppDispatch, useAppSelector } from "@/store";
import Link from "next/link";

export default function VideoList() {
  const [videos, setVideos] = useState<any>();
  const [posicionActual, setPosicionActual] = useState<number | null>(null);
  const [posicionesCapturadas, setPosicionesCapturadas] = useState<number[]>(
    []
  );

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
    useGetFeedVideos().then((videos) => setVideos(videos));
  }, []);

  const onToggle = (id: string, name: string) => {
    const catalog = { id, name };
    console.log(catalog);

    if (addProduct.some((pos) => pos.id === id)) {
      console.log("La posicion ya existe", id);
    } else {
      dispatch(toggleCatalog(catalog));
    }
  };

  const offToggle = (id: string, name: string) => {
    const catalog = { id, name };
    console.log(catalog);

    if (addProduct.some((pos) => pos.id === id)) {
      dispatch(toggleCatalog(catalog));
      console.log("Se encontró el elemento con id ", id);
    } else {
      console.error("La posición actual no es válida");
    }
  };

  return (
    <section className="pb-14 h-full absolute top-0 right-0 left-0 flex flex-col snap-y snap-mandatory overflow-y-auto">
      {!videos
        ? "Loading..."
        : // @ts-ignore
          videos.map((video, index) => {
            return (
              <div
                className="flex flex-row-reverse items-center relative"
                key={index}
              >
                <Video
                  src={video.videoUrl}
                  name={video.name}
                  price={video.price}
                  thumbnail={video.thumbnai}
                />
                <button
                  onClick={() => onToggle(video.externalId, video.name)}
                  className="text-white absolute bottom-[160px] mb-6"
                >
                  <Image src="/img/add.svg" alt="" width={32} height={32} />
                </button>

                <div className="absolute rounded-full p-2 flex items-center bg-white cursor-pointer rigth-0 top-4 mr-3">
                  <Image src="/img/cart.png" alt="" width={20} height={20} />
                  <span className="absolute ml-5 mb-5 rounded-full py-[2px] px-[6px] bg-[#F57E77] text-white">{addProduct.length}</span>
                </div>

                {/*<button
                  onClick={() => offToggle(video.externalId, video.name)}
                  className="text-white absolute mt-5"
                >
                  <Image src="/img/borrar.png" alt="" width={32} height={32} />
                </button>*/}

                <div className="info-overlay absolute bottom-[160px] left-0 right-0 w-[80%]">
                  <div className="flex w-[70%]  bg-[#21181a91] py-2 items-center flex-row pl-3 rounded-r-full border-l-0 border-1 border-spacing-2 border-sh shadow-md shadow-[#DAD2D2]">
                    <div className="rounded-full border-[#42E184] border-2 ">
                      <img
                        className="h-12 w-12 rounded-full"
                        src={video.thumbnail}
                        alt={`${video.name} thumbnail`}
                      />
                    </div>

                    <div className="flex-1 pl-4">
                      <div className="text-white text-sm pb-2">
                        <span>
                          Precio:{" "}
                          <span className="">
                            $ {new Intl.NumberFormat().format(video.price)}
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

                <div className="absolute px-3 flex items-center bg-grey-light cursor-pointer left-0 top-1 h-16">
                    <div className="rounded-full bg-gradient-to-r from-[#42E083] via-yellow-500 to-[#FF8A00] p-[2px]">
                      <div>
                        <img
                          className="h-12 w-12 rounded-full"
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

                {addProduct.length !== 0 ? (
                  <button
                    className=" fixed bottom-0 btn-success w-full h-[54px] text-base"
                    type="button"
                    data-ripple-light="true"
                  >
                    <Link href={`/video`}>Finalizar Compra</Link>
                  </button>
                ) : (
                  ""
                )}
              </div>
            );
          })}
    </section>
  );
}
