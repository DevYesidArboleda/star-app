import Image from 'next/image'
import { Inter } from 'next/font/google'
import { VideoStreaming } from "@/components/VideoStreaming";
import  Form  from "@/components/Form";
import {NextUIProvider} from "@nextui-org/react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <NextUIProvider>
    <div className='bg-[#E7ECEF] flex m-4 flex-col gap-4'>      
      <Form />
    </div>
    </NextUIProvider>
  )
}
