'use client'

import { forwardRef } from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
  selected?: boolean
  children: React.ReactNode
}

const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { hoverable = false, selected = false, className = '', children, ...props },
  ref,
): React.ReactElement {
  return (
    <div
      ref={ref}
      className={`rounded-card border bg-app-white transition-all duration-150 ${
        selected
          ? 'border-app-black'
          : 'border-app-gray-100'
      } ${
        hoverable
          ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-card-hover'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
})

export default Card
