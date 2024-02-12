import { Layout } from "@/components/layouts/Layout";
import ListProduct from "@/components/videoComponents/ListProduct";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import React from "react";

const Video = () => {
  const router = useRouter();
  const handleVolverAtras = () => {
    router.back();
  };

  return (
    <Layout>
      <main className="overflow-hidden md:relative text-white max-w-sm w-full h-screen mx-auto text-xs">
        <div className="flex mt-6 justify-start gap-24">
          {/* Utiliza el componente Link para la navegación */}
          <Link href="#" onClick={handleVolverAtras} className="">
            <Image src="/img/backPage.png" alt="" width={20} height={20} />
          </Link>
          <span className="text-base font-bold text-black">Carrito de compra</span>
        </div>
        <ListProduct />
      </main>
    </Layout>
  );
};

export default Video;
