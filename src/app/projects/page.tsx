import { Suspense } from 'react'
import type { Metadata } from 'next'
import { ProjectsClient } from '@/components/projects/ProjectsClient'

export const metadata: Metadata = {
  title: 'My Projects',
  robots: { index: false, follow: false },
}

export default function ProjectsPage(): React.ReactElement {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-app-text-muted">Loading…</div>}>
      <ProjectsClient />
    </Suspense>
  )
}
