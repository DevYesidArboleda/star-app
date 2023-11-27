import Image from "next/image";
import { Inter } from "next/font/google";
import Form from "@/components/form/FormUnit";
import { Layout } from "@/components/layouts/Layout";
import { GetStaticProps } from "next";
import { dataApi } from "../../api";
import { Data, Doc } from "../../interfaces";

const inter = Inter({ subsets: ["latin"] });
interface Props {
  dataFinal: Doc[];
}

export default function Home({ dataFinal }: Props) {
  return (
    <Layout title="Checkout Estrellas">
      <div className="">
        <Form data={dataFinal} />
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await dataApi.get<Data>("/products/allProducts");
  const dataFinal: Doc[] = data.doc;
  return {
    props: {
      dataFinal,
    },
  };
};
