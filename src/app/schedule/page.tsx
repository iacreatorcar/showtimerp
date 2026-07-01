'use client'

import dynamic from 'next/dynamic'

const ScheduleList = dynamic(() => import('@/src/components/ScheduleList'), { ssr: false })

export default function SchedulePage() {
  return <ScheduleList />
}
