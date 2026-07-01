'use client'

import dynamic from 'next/dynamic'

const VideoPreview = dynamic(() => import('@/src/components/VideoPreview'), { ssr: false })

export default function VideosPage() {
  return <VideoPreview />
}
