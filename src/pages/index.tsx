import Image from "next/image";
import { Inter } from "next/font/google";
import Form from "@/components/form/FormUnit";
import { Layout } from "@/components/layouts/Layout";
import { GetStaticProps } from "next";
import { dataApi } from "../../api";
import { Data, Doc } from "../../interfaces";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Loading from "@/components/loading/Loading";

const inter = Inter({ subsets: ["latin"] });
interface Props {
  dataFinal: Doc[];
}

export default function Home() {
  const [thumbnail, setThumbnail] = useState<any>();
  const [dataFinal, setDataFinal] = useState<any>([]);
  const [validPage, setValidPage] = useState<boolean>(false);
  const [loadingContent, setLoadingContent] = useState<boolean>(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    //setLoading(<p>Cargando.......</p>);
    const fechtDataPrueba = async () => {
      const product_id = searchParams.get("productID");
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
    dataFinal.forEach((element: any) => {
      setThumbnail(element.thumbnail);
    });
  }, [dataFinal]);

  return (
    <Layout title="Checkout Estrellas" thumbnail={thumbnail}>
      <div className="">
        {validPage ? (
          <Form data={dataFinal} />
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
              <p>Cargando.......</p>
            )}
          </Loading>
        )}
      </div>
    </Layout>
  );
}

/*export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await dataApi.get<Data>("/products/allProducts");
  const dataFinal: Doc[] = data.doc;
  return {
    props: {
      dataFinal,
    },
  };
};*/
