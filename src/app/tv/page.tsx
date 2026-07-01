'use client'

import dynamic from 'next/dynamic'

const TVScreen = dynamic(() => import('@/src/components/TVScreenClient'), { ssr: false })

export default function TVPage() {
  return <TVScreen />
}
