import { Layout } from '@/components/layouts/Layout';
import VideoList from '@/components/videoComponents/VideoList';
import React from 'react'

const Video = () => {
  return (
        <main className="overflow-hidden md:relative bg-black text-white max-w-sm w-full h-screen mx-auto text-xs">
        <VideoList />        
      </main>
  )
}

export default Video;