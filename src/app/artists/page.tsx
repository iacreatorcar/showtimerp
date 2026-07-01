'use client'

import dynamic from 'next/dynamic'

const ArtistsGrid = dynamic(() => import('@/src/components/ArtistsGrid'), { ssr: false })

export default function ArtistsPage() {
  return <ArtistsGrid />
}
