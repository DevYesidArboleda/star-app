import React, { useState } from 'react'
import ProductGrid from '@/components/videoComponents/ProductGrid';
import { useAppSelector } from '@/store';

export default function  ListProduct ()  {

    const addProduct = useAppSelector(state => Object.values( state.catalogo) )
    const [products, setProducts] = useState(addProduct)

  return (
    <div>
        <>
        {
            products.length === 0
            ? (<NoAddProducts />)
            :(<ProductGrid catalog={ addProduct }/>)
        }
        </>
    </div>
  )
}

export const NoAddProducts = () => {
    return (
        <div className='flex flex-col h-[50vh] items-center justify-center'>
            <span>No hay productos agregados</span>
        </div>
    )
}