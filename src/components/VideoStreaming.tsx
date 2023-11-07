import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

interface typeData {
    name:string;
    description:string;
    tags:string[];
}

export const VideoStreaming = () => {
  const [video, setVideo] = useState<JSX.Element | null>(null);
  const [data, setData] = useState([]);
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
        setData(result.doc[2]);
        setUrl(result.doc[2].videoUrl);
        console.log("respuesta", result.doc[2]);
        console.log("video", result.doc[2].videoUrl);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setVideo(<ReactPlayer url={`${url}`} controls={true} />);
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row ">
        {video}
        <div className="flex flex-col justify-between p-4 leading-normal">
            <h1 className="text-4xl  text-[#274C77] font-bold">Producto</h1>
            <br />
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#53545C] ">
            {data.name}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            
            Description: {data.description}
          </p>
          <br />
          <h1 className="text-black">Tallas Disponibles</h1>
          <ul className="flex gap-2">
            {data.tags.map((items:any, index:number ) => {
            return <li key={index} className="flex text-black">{items}</li>
            })}
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
      </div>
    </div>
  );
};
