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

const inter = Inter({ subsets: ["latin"] });
interface Props {
  dataFinal: Doc[];
}

export default function Home() {  
  const [thumbnail, setThumbnail]  = useState<any>();
  const [dataFinal, setDataFinal] = useState<any>([]);
  const searchParams = useSearchParams() 
  
  useEffect(()=> {
    const fechtDataPrueba = async () => {
      const product_id = searchParams.get('productID')
      const queryParam = { _id: product_id };

      const dataApi = await axios.get(`https://martiolo.xyz/api/products/allProducts`, {
        headers: {            
        },
        params: {
          query: JSON.stringify(queryParam)
        }
      })  
      
      setDataFinal(dataApi.data.data)
    }
   
      fechtDataPrueba()
     
  }, [searchParams])

  useEffect(()=>{   
    dataFinal.forEach((element:any)=> {
      setThumbnail(element.thumbnail)
    });  
    
  }, [dataFinal])


  return (
    <Layout title="Checkout Estrellas" thumbnail={thumbnail}>
      <div className="">
        <Form data={dataFinal} />
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
