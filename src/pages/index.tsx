import Image from 'next/image'
import { Inter } from 'next/font/google'
import { VideoStreaming } from "@/components/VideoStreaming";
import  Form  from "@/components/Form";
import {NextUIProvider} from "@nextui-org/react";
import { Header } from '@/components/Header';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <NextUIProvider>
    <Header/>
    <div className=''>      
      <Form />
    </div>
    </NextUIProvider>
  )
}
