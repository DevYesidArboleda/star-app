import { Layout } from "@/components/layouts/Layout";
import ListProduct from "@/components/videoComponents/ListProduct";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import React from "react";
import { PayCatalog } from "@/components/videoComponents/PayCatalog";

const completePayCatalog = () => {
  

  return (
    <Layout>
      <div>
        <PayCatalog/>
      </div>
    </Layout>
  );
};

export default completePayCatalog;