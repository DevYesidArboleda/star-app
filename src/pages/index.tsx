import Image from 'next/image'
import { Inter } from 'next/font/google'
import { VideoStreaming } from "@/components/VideoStreaming";
import  Form  from "@/components/form";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <div className='bg-white flex m-4 flex-col gap-4'>
      <h1>Coming soon</h1>
      <br />
      <Form />
    </div>
    </>
  )
}
