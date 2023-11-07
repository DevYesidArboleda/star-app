import Image from 'next/image'
import { Inter } from 'next/font/google'
import { VideoStreaming } from "@/components/VideoStreaming";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <div className='flex m-4 flex-col gap-4'>
      <h1>Coming soon</h1>
      <br />
      <VideoStreaming/>
    </div>
    </>
  )
}
