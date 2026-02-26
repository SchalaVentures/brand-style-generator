'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useBrandStore } from '@/store/brand-store'
import { loadProject } from '@/lib/projects'
import { loadGoogleFont } from '@/lib/fonts'

export function ProjectLoader(): null {
  const searchParams = useSearchParams()
  const loadedRef = useRef<string | null>(null)

  useEffect(() => {
    const projectId: string | null = searchParams.get('project')

    if (projectId === null || projectId === loadedRef.current) return

    loadedRef.current = projectId

    loadProject(projectId).then((state) => {
      if (state === null) return

      useBrandStore.setState({
        ...state,
        projectId,
        wizardCompleted: true,
        currentStep: 4,
      })

      // Load the project's fonts
      loadGoogleFont(state.headingFont, [state.headingWeight])
      loadGoogleFont(state.bodyFont, [state.bodyWeight])
    })
  }, [searchParams])

  return null
}
