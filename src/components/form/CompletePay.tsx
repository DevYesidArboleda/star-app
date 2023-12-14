import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'



export const CompletePay   = ({user_id}:any) => {
    const [completePay, setCompletePay] = useState<boolean>()
    console.log("llego",user_id)
    

  return (
    <div className='flex flex-col items-center bg-white border border-gray-200 rounded-lg justify-evenly shadow md:max-w-screen-lg mx-3 max-w-[366px]'>
        <div className=''>
            <Image 
            src="/img/thanksPay.png"
            width={1024}
            height={1024}
            alt="Logo Star"
            className='rounded-lg '
            priority={true}/>
        </div>
        <div className=''>
            <h1 className='text-black font-bold text-center lg:text-[24px] lg:px-[96px] lg:pt-6  xl:text-2xl lg:text-2xl text-base leading-6 px-14 md:px-24 xl:px-28 md:pt-6 md:pb-5 pb-7 pt-8'>
                Has realizado tu compra de manera <b className='text-[#42E184] font-normal'>exitosa</b>, en tu correo está el resumen de tu pedido
            </h1>
        </div>        
        <div>
            <h1 className='text-[#53545C] xl:text-xl text-center xl:px-[169px] md:px-[112px] lg:px-[34px] lg:pt-[42px] lg:pb-[30px] sm:py-[32px] pb-9 px-10 md:text-base sm:text-base text-xs leading-5'>
                ¡Únete a nuestra comunidad de estrellas y genera ventas con productos de nuestros catálogos!
            </h1>            
        </div>
        <div className='md:pb-[46px] pb-20'>
            <button className='btn-success xl:h-[63px] lg:h-[58px] h-[44px] w-full xl:min-w-[705px] lg:min-w-[469px] md:min-w-[460px] min-w-[268px] text-xl' >
                <Link href={`/register?userID=${user_id}`}>Quiero ser una estrella</Link>
            </button>
        </div>
    </div>
  )
}
