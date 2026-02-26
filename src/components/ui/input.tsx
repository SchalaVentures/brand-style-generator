'use client'

import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, className = '', id, ...props },
  ref,
): React.ReactElement {
  const inputId: string = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : '')
  const hasError: boolean = error !== undefined && error !== ''

  return (
    <div className="flex flex-col gap-1.5">
      {label !== undefined && (
        <label
          htmlFor={inputId}
          className="text-xs font-medium text-app-gray-500"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={`h-12 rounded-btn border px-4 text-sm text-app-black transition-colors duration-150 placeholder:text-app-gray-400 focus-visible:outline-none ${
          hasError
            ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/20'
            : 'border-app-gray-100 focus-visible:border-app-black focus-visible:ring-2 focus-visible:ring-app-black/10'
        } ${className}`}
        {...props}
      />
      {hasError && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </div>
  )
})

export default Input
