'use client'

import { useState } from 'react'
import { useBrandStore } from '@/store/brand-store'
import Modal from '@/components/ui/modal'
import { generateCSSExport } from '@/lib/export-css'
import { generateTailwindExport } from '@/lib/export-tailwind'
import { generateFigmaTokensExport } from '@/lib/export-figma'

type ExportFormat = 'css' | 'tailwind' | 'figma' | 'pdf'

interface FormatTab {
  id: ExportFormat
  label: string
  ext: string
}

interface ExportModalProps {
  open: boolean
  onClose: () => void
}

const FORMAT_TABS: FormatTab[] = [
  { id: 'css', label: 'CSS Variables', ext: '.css' },
  { id: 'tailwind', label: 'Tailwind', ext: '.ts' },
  { id: 'figma', label: 'Figma Tokens', ext: '.json' },
  { id: 'pdf', label: 'PDF Guide', ext: '.pdf' },
]

export function ExportModal({ open, onClose }: ExportModalProps): React.ReactElement {
  const [activeFormat, setActiveFormat] = useState<ExportFormat>('css')
  const [copied, setCopied] = useState<boolean>(false)
  const [pdfLoading, setPdfLoading] = useState<boolean>(false)

  const state = useBrandStore.getState()

  const getExportContent = (): string => {
    switch (activeFormat) {
      case 'css':
        return generateCSSExport(state)
      case 'tailwind':
        return generateTailwindExport(state)
      case 'figma':
        return generateFigmaTokensExport(state)
      case 'pdf':
        return ''
    }
  }

  const content: string = activeFormat !== 'pdf' ? getExportContent() : ''

  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => { setCopied(false) }, 2000)
  }

  const handleDownload = async (): Promise<void> => {
    if (activeFormat === 'pdf') {
      setPdfLoading(true)
      try {
        const currentState = useBrandStore.getState()
        const { pdf } = await import('@react-pdf/renderer')
        const { generatePDFDocument } = await import('@/lib/export-pdf')
        const doc = generatePDFDocument(currentState)
        const blob: Blob = await pdf(doc).toBlob()
        const url: string = URL.createObjectURL(blob)
        const a: HTMLAnchorElement = document.createElement('a')
        a.href = url
        a.download = `${currentState.name.toLowerCase().replace(/\s+/g, '-')}-brand-guide.pdf`
        a.click()
        URL.revokeObjectURL(url)
      } finally {
        setPdfLoading(false)
      }
      return
    }

    const tab: FormatTab | undefined = FORMAT_TABS.find((t: FormatTab) => t.id === activeFormat)
    const slug: string = state.name.toLowerCase().replace(/\s+/g, '-') || 'brand'
    const filename: string = `${slug}-brand${tab?.ext ?? '.txt'}`
    const blob: Blob = new Blob([content], { type: 'text/plain' })
    const url: string = URL.createObjectURL(blob)
    const a: HTMLAnchorElement = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Modal open={open} onClose={onClose} title="Export Your Brand">
      {/* Format tabs */}
      <div className="flex gap-1 border-b border-app-gray-100">
        {FORMAT_TABS.map((tab: FormatTab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setActiveFormat(tab.id)
              setCopied(false)
            }}
            className={`
              cursor-pointer px-4 py-2 text-sm font-medium rounded-t-md transition-colors
              ${activeFormat === tab.id
                ? 'bg-app-bg-alt text-app-black border-b-2 border-app-black'
                : 'text-app-text-muted hover:text-app-black'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content area */}
      {activeFormat === 'pdf' ? (
        <div className="py-8 text-center">
          <p className="text-sm text-app-text-muted mb-4">
            Download a professionally formatted PDF brand guide.
          </p>
          <button
            type="button"
            onClick={handleDownload}
            disabled={pdfLoading}
            className="cursor-pointer rounded-lg bg-app-black px-6 py-2.5 text-sm font-semibold text-white
                       hover:bg-app-accent-hover transition-colors disabled:opacity-60"
          >
            {pdfLoading ? 'Generating…' : 'Download PDF'}
          </button>
        </div>
      ) : (
        <>
          {/* Code preview */}
          <div className="mt-4 max-h-80 overflow-y-auto rounded-lg bg-[#1e1e1e] p-4">
            <pre className="text-[13px] leading-relaxed text-[#d4d4d4] font-mono whitespace-pre-wrap">
              {content}
            </pre>
          </div>

          {/* Action buttons */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-app-text-muted">
              {FORMAT_TABS.find((t: FormatTab) => t.id === activeFormat)?.label}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="cursor-pointer rounded-lg border border-app-gray-100 px-4 py-2 text-sm
                           hover:border-app-gray-200 transition-colors"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="cursor-pointer rounded-lg bg-app-black px-4 py-2 text-sm font-medium text-white
                           hover:bg-app-accent-hover transition-colors"
              >
                Download
              </button>
            </div>
          </div>
        </>
      )}
    </Modal>
  )
}
