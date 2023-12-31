import React from 'react'
import Image from 'next/image'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

export const NavBar = () => {
  return (
    
    <Navbar position="static" className='md:h-16 h-8'>
    <NavbarBrand className='grow-0 basis-auto w-[32px] md:w-[64px]'>
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
            <div className=''>
              <span className='font-black text-base text-black md:hidden flex'>estrellas</span>
            </div>
    </NavbarBrand>
    
  </Navbar>
  )
}
