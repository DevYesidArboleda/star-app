import Image from "next/image";
import { Inter } from "next/font/google";
import Form from "@/components/form/FormUnit";
import { Layout } from "@/components/layouts/Layout";
import { GetStaticProps, GetServerSideProps } from "next";
import { dataApi } from "../../api";
import { Data, products } from "../../interfaces";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Loading from "@/components/loading/Loading";
import Head from 'next/head';
import VideoList from "@/components/videoComponents/VideoList";
import ListProduct from "@/components/videoComponents/ListProduct";

const inter = Inter({ subsets: ["latin"] });
interface Props {
  metada: products[];
}

export default function Home({metadata} : any){
  const [thumbnail, setThumbnail] = useState<any>();
  const [productName, setProductNamel] = useState<any>();
  const [dataFinal, setDataFinal] = useState<any>([]);
  const [validPage, setValidPage] = useState<boolean>(false);
  const [loadingContent, setLoadingContent] = useState<boolean>(false);
  const searchParams = useSearchParams();
  
  const product_id = searchParams.get("productID");
  //const product: any | undefined = (metada.products || []).find((product:any) => product._id === `"${product_id}"`);
  //const final:any = metadata?.filter((task:any) => task._id === product_id)

  useEffect(() => {
    //setLoading(<p>Cargando.......</p>);
    const fechtDataPrueba = async () => {
      const queryParam = { _id: product_id };
      const isValidMongoId = (id: string) => {
        const mongoIdPattern = /^[0-9a-fA-F]{24}$/;
        return mongoIdPattern.test(id);
      };

      const myMongoId: any = product_id;
      if (isValidMongoId(myMongoId)) {
        console.log("ID de MongoDB válido");
        setValidPage(true);
        const dataApi = await axios.get(
          `https://martiolo.xyz/api/products/allProducts`,
          {
            headers: {},
            params: {
              query: JSON.stringify(queryParam),
            },
          }
        );

        console.log(dataApi);

        setDataFinal(dataApi.data.data.products);
      } else {
        if(product_id !== null){
          setLoadingContent(true);
        }
      }
    };

    fechtDataPrueba();
  }, [searchParams]);

  useEffect(() => {    
    //setThumbnail(final[0]?.thumbnail);
    //setProductNamel(final[0]?.name)
  }, []);

  return (
    <>    
    <Layout title="Checkout Estrellas" thumbnail={metadata[0]?.thumbnail} name={metadata[0]?.name}>
      <div className="">
        {validPage ? (
          //<Form data={dataFinal} />
            <main className="overflow-hidden md:relative bg-black text-white max-w-sm w-full h-screen mx-auto text-xs">
          <VideoList />   
          <ListProduct/>     
        </main>
        ) : (
          <Loading>
            {loadingContent ? (
              <div className="flex items-center justify-center h-screen">
                <div className="bg-white  border-gray-200 rounded-lg flex flex-col justify-center items-center gap-2 p-6">
                  <Image
                    src="/img/task_alt.svg"
                    alt=""
                    width={48}
                    height={48}
                  />
                  <span className="text-green-400 text-xl text-center">
                    Por favor contacta con tu vendedor
                  </span>
                  <span className="text-black text-base font-medium">
                    información no valida !
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <p>Cargando.......</p>
              </div>
            )}
          </Loading>
        )}
      </div>
    </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<any> = async (context) => {
  const { query } = context;

  // Extrae productID de los parámetros de la URL
  const productID = query.productID as string;
  const queryParam = { _id: productID };

  try {
    // Obtener metadatos automáticamente en el servidor
    const response = await dataApi.get(`/products/allProducts`,
    {
      headers: {},
      params: {
        query: JSON.stringify(queryParam),
      },
    });
    const metadata:any = response.data.data.products;
    return {
      props: {
        metadata,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        metadata: null,
      },
    };
  }
};
