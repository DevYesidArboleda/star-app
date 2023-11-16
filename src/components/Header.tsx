import React from 'react'
import Image from 'next/image'

export const Header = () => {
  return (
    <div className='flex bg-white justify-start  h-[50px] items-center pl-5 md:pl-20 md:h-[80px]'>
      <div className='w-[32px] md:w-[64px]'>
        <Image
            src="/logoStar.svg"
            alt="Logo Star"
            width={64}
            height={64}
            style={{
              width: '100%',
              height: 'auto',
            }}
            priority={true}/>
      </div>    
    </div>
  )
}
