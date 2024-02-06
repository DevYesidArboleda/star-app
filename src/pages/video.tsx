import { Layout } from '@/components/layouts/Layout';
import ListProduct from '@/components/videoComponents/ListProduct';

import React from 'react'

const Video = () => {
  return (
        <Layout>
          <main className="overflow-hidden md:relative bg-black text-white max-w-sm w-full h-screen mx-auto text-xs">
          <ListProduct/>
      </main>
        </Layout>
  )
}

export default Video;