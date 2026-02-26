import { Suspense } from 'react'
import type { Metadata } from 'next'
import { BuilderLayout } from '@/components/builder/BuilderLayout'
import { ProjectLoader } from '@/components/builder/ProjectLoader'

export const metadata: Metadata = {
  title: 'Create Your Brand Style',
  description:
    'Pick colors, fonts, and tone. See your brand come alive on real product mockups.',
}

export default function CreatePage(): React.ReactElement {
  return (
    <Suspense>
      <ProjectLoader />
      <BuilderLayout />
    </Suspense>
  )
}
