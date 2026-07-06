'use client'

import dynamic from 'next/dynamic'

const ArtistProfilePage = dynamic(() => import('@/src/components/ArtistProfilePage'), { ssr: false })

export default function ArtistPage({ params }: { params: Promise<{ id: string }> }) {
  return <ArtistProfilePage paramsPromise={params} />
}
