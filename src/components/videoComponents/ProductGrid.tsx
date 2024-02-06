import React from 'react'
import { SimpleCatalog } from '../../../interfaces';
import ProductCard from './ProductCard';

interface Props {
    catalog: SimpleCatalog[];
  }

export default function  ProductGrid  ( {catalog} : Props) {
  return (
    <div className="flex flex-wrap gap-10 items-center justify-center">

        {
          catalog.map( cat => (
            <ProductCard key={ cat.id } catalogs={cat} />            
          ))
        }
        
    </div>
  )
}
