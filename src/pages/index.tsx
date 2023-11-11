import Image from 'next/image'
import { Inter } from 'next/font/google'
import { VideoStreaming } from "@/components/VideoStreaming";
import  Form  from "@/components/form";
import {NextUIProvider} from "@nextui-org/react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <NextUIProvider>
    <div className=''>      
      <Form />
    </div>
    </NextUIProvider>
  )
}
