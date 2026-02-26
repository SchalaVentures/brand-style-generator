import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines clsx and tailwind-merge for conditional class names.
 * Resolves Tailwind CSS class conflicts automatically.
 *
 * @example
 * cn('px-4 py-2', isLarge && 'px-6 py-3', className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Truncate text with ellipsis.
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

/**
 * Format a date to a readable string.
 */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d: Date = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  })
}

// ---------------------------------------------------------------------------
// Error handling utilities
// Per TYPESCRIPT_STANDARDS.md — use these instead of inline `instanceof Error`
// ---------------------------------------------------------------------------

interface ErrorWithMessage {
  message: string
}

export function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as ErrorWithMessage).message === 'string'
  )
}

export function getErrorMessage(error: unknown): string {
  return isErrorWithMessage(error) ? error.message : 'Unknown error'
}
