'use client'

import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const VARIANT_CLASSES: Record<string, string> = {
  primary:
    'bg-app-black text-app-white hover:bg-app-black/90 active:bg-app-black/80',
  secondary:
    'bg-transparent border border-app-gray-100 text-app-black hover:bg-app-gray-50 active:bg-app-gray-100',
  ghost:
    'bg-transparent text-app-gray-500 hover:bg-app-gray-50 hover:text-app-black active:bg-app-gray-100',
  destructive:
    'bg-red-600 text-app-white hover:bg-red-700 active:bg-red-800',
}

const SIZE_CLASSES: Record<string, string> = {
  sm: 'px-4 py-2.5 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-3.5 text-sm',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className = '', children, disabled, ...props },
  ref,
): React.ReactElement {
  const variantClass: string = VARIANT_CLASSES[variant] ?? VARIANT_CLASSES['primary']!
  const sizeClass: string = SIZE_CLASSES[size] ?? SIZE_CLASSES['md']!

  return (
    <button
      ref={ref}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-btn font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-black disabled:pointer-events-none disabled:opacity-50 ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
})

export default Button
