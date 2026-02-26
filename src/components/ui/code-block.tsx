'use client'

import { useState, useCallback } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps {
  code: string
  language?: string
  copyable?: boolean
}

export default function CodeBlock({
  code,
  language,
  copyable = true,
}: CodeBlockProps): React.ReactElement {
  const [copied, setCopied] = useState<boolean>(false)

  const handleCopy = useCallback(async (): Promise<void> => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [code])

  return (
    <div className="relative rounded-card border border-app-gray-100 bg-app-gray-50">
      {language !== undefined && (
        <div className="border-b border-app-gray-100 px-4 py-2">
          <span className="text-xs font-medium text-app-gray-400">{language}</span>
        </div>
      )}
      {copyable && (
        <button
          onClick={handleCopy}
          className="absolute right-3 top-3 cursor-pointer rounded-md p-1.5 text-app-gray-400 transition-colors hover:bg-app-gray-100 hover:text-app-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-black"
          aria-label={copied ? 'Copied' : 'Copy code'}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-600" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      )}
      <pre className="overflow-x-auto p-4">
        <code className="font-mono text-[13px] leading-relaxed text-app-black">
          {code}
        </code>
      </pre>
    </div>
  )
}
