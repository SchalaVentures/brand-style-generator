'use client'

import { useEffect, useRef, useState } from 'react'
import { useBrandStore } from '@/store/brand-store'
import { getSession } from '@/lib/nhost'
import { saveProject } from '@/lib/projects'
import type { BrandState } from '@/types/brand'

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

const DEBOUNCE_MS: number = 3000
const SAVED_DISPLAY_MS: number = 2000
const ERROR_DISPLAY_MS: number = 3000

function hasBrandDataChanged(a: BrandState, b: BrandState): boolean {
  return (
    a.name !== b.name ||
    a.tagline !== b.tagline ||
    a.primaryColor !== b.primaryColor ||
    a.colorFamilyId !== b.colorFamilyId ||
    a.colorShadeId !== b.colorShadeId ||
    a.colorType !== b.colorType ||
    a.gradientCSS !== b.gradientCSS ||
    a.headingFont !== b.headingFont ||
    a.headingWeight !== b.headingWeight ||
    a.bodyFont !== b.bodyFont ||
    a.bodyWeight !== b.bodyWeight ||
    a.fontCategoryId !== b.fontCategoryId ||
    a.fontPairId !== b.fontPairId ||
    a.tonePresetId !== b.tonePresetId
  )
}

export function useAutoSave(): SaveStatus {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const statusRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const unsubscribe = useBrandStore.subscribe((state: BrandState, prevState: BrandState) => {
      const session = getSession()

      // Only auto-save if authenticated (anonymous or real)
      if (session === null) return

      // Only auto-save if brand data actually changed
      if (!hasBrandDataChanged(state, prevState)) return

      // Clear existing debounce timer
      if (debounceRef.current !== null) {
        clearTimeout(debounceRef.current)
      }
      if (statusRef.current !== null) {
        clearTimeout(statusRef.current)
      }

      setSaveStatus('saving')

      debounceRef.current = setTimeout(() => {
        const currentState = useBrandStore.getState()
        saveProject(currentState, currentState.projectId)
          .then(({ id, isNew }) => {
            if (isNew) {
              useBrandStore.getState().setProjectId(id)
            }
            setSaveStatus('saved')
            statusRef.current = setTimeout(() => { setSaveStatus('idle') }, SAVED_DISPLAY_MS)
          })
          .catch(() => {
            setSaveStatus('error')
            statusRef.current = setTimeout(() => { setSaveStatus('idle') }, ERROR_DISPLAY_MS)
          })
      }, DEBOUNCE_MS)
    })

    return () => {
      unsubscribe()
      if (debounceRef.current !== null) clearTimeout(debounceRef.current)
      if (statusRef.current !== null) clearTimeout(statusRef.current)
    }
  }, [])

  return saveStatus
}
