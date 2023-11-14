import React from 'react'
import Image from 'next/image'

export const Header = () => {
  return (
    <div className='flex bg-white justify-start h-[84px] items-center pl-20'>
        <Image
            src="/logoStar.svg"
            width={64}
            height={64}
            alt="Logo Star"
    /></div>
  )
}
