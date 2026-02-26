'use client'

import { useState } from 'react'

interface TooltipProps {
  content: string
  children: React.ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
}

const POSITION_CLASSES: Record<string, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}

export default function Tooltip({
  content,
  children,
  side = 'top',
}: TooltipProps): React.ReactElement {
  const [visible, setVisible] = useState<boolean>(false)

  const positionClass: string = POSITION_CLASSES[side] ?? POSITION_CLASSES['top']!

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={`absolute z-50 whitespace-nowrap rounded-md bg-app-black px-2 py-1 text-xs text-app-white shadow-lg animate-in fade-in duration-100 ${positionClass}`}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  )
}
