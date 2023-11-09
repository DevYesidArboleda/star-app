import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

interface typeData {    
      name:string;
      description:string;
      price:number;
      tags:string[] ;    
}

export const VideoStreaming = () => {
  const [video, setVideo] = useState<JSX.Element | null>(null);
  const [data, setData] = useState<typeData[]>([]);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://martiolo.xyz/api/products/allProducts"
        );
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        const result = await response.json();
        setData(result.doc);
        setUrl(result.doc[2].videoUrl);
        console.log("respuesta", result);
        console.log("video", result.doc[2].videoUrl);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);
  

  useEffect(() => {
    setVideo(<ReactPlayer url={`${url}`} controls={true} height="750px" width="464px"/>);
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row pr-8">
        <div className="w-auto h-4/5 rounded-md m-8 videoPlayer">
          {video}
        </div>
        <div className="flex flex-col  h-full gap-12 justify-start items-start">
          <div className="border-b-2 border-[#8B8C89] w-full">
            <h1 className="text-2xl  text-[#53545C] font-bold">Producto</h1>
              <br />
            <h5 className="mb-2 text-xl font-normal tracking-tight text-black ">
              { data && data[2]?.name }
            </h5>
          </div>
          <div className="border-b-2 border-[#8B8C89] w-full">
            <p className="mb-3 font-normal text-black text-xl">            
              Pago contra entrega
            </p>
          </div>
          <div className="border-b-2 border-[#8B8C89] w-full">
            <p className="mb-3 font-bold text-2xl text-[#53545C] ">            
              Envío gratis
            </p>
          </div>
          <div className="border-b-2 border-[#8B8C89] w-full">
            <p className="mb-2 text-xl font-normal tracking-tight text-black">            
              Description: { data && data[2]?.description }
            </p>
          </div>
          <div className="border-b-2 border-[#8B8C89] w-full">
            <h1 className="mb-3 font-bold text-2xl text-[#53545C]">Variaciones</h1>
              <ul className="flex gap-2">
              {data.length > 0 && data[2]?.tags.map((items:any, index:number ) => {
                return <li key={index} className="mb-2 text-xl font-normal tracking-tight text-black">{items}</li>
                }) }
              </ul>
          </div>
          <div className="flex w-full justify-center">
          <button
              className="select-none rounded-lg bg-[#8B8C89] py-3 px-12 normal-case text-center align-middle font-sans text-xl font-normal text-white shadow-md shadow-slate-800/20 transition-all hover:shadow-lg hover:shadow-slate-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              data-ripple-light="true"
            >
              Comprar producto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/*

<div className="flex h-screen flex-col justify-around h-min p-4 leading-normal">
            <h1 className="text-4xl  text-[#274C77] font-bold">Producto</h1>
            <br />
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#53545C] ">
            { data && data[2]?.name }
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">            
          Description: { data && data[2]?.description }
          </p>
          <br />
          <h1 className="text-black">Tallas Disponibles</h1>
          <ul className="flex gap-2">
          {data.length > 0 && data[2]?.tags.map((items:any, index:number ) => {
            return <li key={index} className="flex text-black">{items}</li>
            }) }
          </ul>
          <br />
          <div className="p-6 pt-0">
            <button
              className="select-none rounded-lg bg-[#8B8C89] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-slate-800/20 transition-all hover:shadow-lg hover:shadow-slate-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              data-ripple-light="true"
            >
              Comprar producto
            </button>
          </div>
        </div>

    <div>
    { data.map((item:typeData, index:number) => {
    console.log("item:::::", item)
    return (
        <div key={index}>{item.name}</div>
    )
  })}
  </div>
*/