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
              <div className="flex flex-row-reverse items-center" key={index}>
                <Video src={video.videoUrl} />
                <button
                  onClick={() => onToggle(video.externalId, video.name)}
                  className="text-white absolute mb-14"
                >
                  <Image src="/img/mas.png" alt="" width={32} height={32} />
                </button>
                <button
                  onClick={() => offToggle(video.externalId, video.name)}
                  className="text-white absolute mt-5"
                >
                  <Image src="/img/borrar.png" alt="" width={32} height={32} />
                </button>
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
