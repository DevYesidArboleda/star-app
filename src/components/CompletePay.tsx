import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'



export const CompletePay   = () => {
    const [completePay, setCompletePay] = useState<boolean>()
    

  return (
    <div className='flex flex-col items-center bg-white border border-gray-200 rounded-lg justify-evenly shadow max-w-screen-lg mx-3'>
        <div className=''>
            <h1 className='text-black font-bold text-center md:text-[32px] md:leading-[38.73px] md:px-[116px] md:pt-[43px] md:pb-[53px] text-xl leading-6 px-4 pt-6 pb-5'>
                Has realizado tu compra de manera exitosa, en tu correo está el resumen de tu pedido
            </h1>
        </div>
        <div>
            <Image 
            src="/finishPay.png"
            width={1024}
            height={1024}
            alt="Logo Star"
            priority={true}/>
        </div>
        <div>
            <h1 className='text-[#53545C] md:text-2xl text-center md:px-[169px] md:pt-[42px] md:pb-[30px] text-base leading-5 px-[34px] py-[32px]'>
                ¡Únete a nuestra comunidad de estrellas y genera ventas con productos de nuestros catálogos!
            </h1>            
        </div>
        <div className='pb-[50px]'>
            <button className='btn-success ' >
                <Link href="/register">Quiero ser una estrella</Link>
            </button>
        </div>
    </div>
  )
}
