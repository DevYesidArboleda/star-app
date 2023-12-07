import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'



export const CompletePay   = ({user_id}:any) => {
    const [completePay, setCompletePay] = useState<boolean>()
    console.log("llego",user_id)
    

  return (
    <div className='flex flex-col items-center bg-white border border-gray-200 rounded-lg justify-evenly shadow max-w-screen-lg mx-3'>
        <div>
            <Image 
            src="/finishPay.png"
            width={1024}
            height={1024}
            alt="Logo Star"
            priority={true}/>
        </div>
        <div className=''>
            <h1 className='text-black font-bold text-center lg:text-2xl lg:px-[96px] lg:pt-6  text-xl leading-6 px-4 md:px-24 xl:px-28 pt-6 pb-5'>
                Has realizado tu compra de manera exitosa, en tu correo está el resumen de tu pedido
            </h1>
        </div>        
        <div>
            <h1 className='text-[#53545C] xl:text-2xl text-center xl:px-[169px] md:px-[112px] px-[34px] pt-[42px] pb-[30px] sm:py-[32px] md:text-base sm:text-base leading-5'>
                ¡Únete a nuestra comunidad de estrellas y genera ventas con productos de nuestros catálogos!
            </h1>            
        </div>
        <div className='pb-[50px]'>
            <button className='btn-success ' >
                <Link href={`/register?userID=${user_id}`}>Quiero ser una estrella</Link>
            </button>
        </div>
    </div>
  )
}
