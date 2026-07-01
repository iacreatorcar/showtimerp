'use client'

import dynamic from 'next/dynamic'

const LedWallPanel = dynamic(() => import('@/src/components/LedWallPanel'), { ssr: false })

export default function LedWallPage() {
  return <LedWallPanel />
}
