import Image from "next/image";
import { Inter } from "next/font/google";
import Form from "@/components/FormUnit";
import { Layout } from "@/components/layouts/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout title="Checkout Estrellas">
      <div className="">
        <Form />
      </div>
    </Layout>
  );
}
