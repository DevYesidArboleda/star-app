import Link from 'next/link'
import React from 'react'
import { SimpleCatalog } from '../../../interfaces';

interface Props {
    catalogs: SimpleCatalog;
  }

export default function  ProductCard (catalog : Props) {

    console.log("aja", catalog)
  return (
    <div className="mx-auto right-0 mt-2 w-60">
    <div className="flex flex-col bg-white rounded overflow-hidden shadow-lg">
      <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-800 border-b">        

        <p className="pt-2 text-lg font-semibold text-gray-50 capitalize">{ catalog.catalogs.name  }</p>
        <div className="mt-5">
         
        </div>
      </div>
      

    </div>
  </div>
  )
}
