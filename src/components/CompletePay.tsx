import React from 'react'
import Image from 'next/image'

export const CompletePay = () => {
  return (
    <div className='flex flex-col items-center bg-white border border-gray-200 rounded-lg justify-evenly shadow max-w-screen-lg'>
        <div className=''>
            <h1 className='text-black font-bold text-[32px] text-center leading-[38.73px] px-[116px] pt-[43px] pb-[53px]'>
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
            <h1 className='text-[#53545C] text-2xl text-center px-[169px] pt-[42px] pb-[30px]'>
                ¡Únete a nuestra comunidad de estrellas y genera ventas con productos de nuestros catálogos!
            </h1>            
        </div>
        <div className='pb-[50px]'>
            <button className='btn-success '>
                Quiero ser una estrella
            </button>
        </div>
    </div>
  )
}
