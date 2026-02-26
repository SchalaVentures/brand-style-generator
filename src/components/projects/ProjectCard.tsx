'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { Pencil } from 'lucide-react'

interface ProjectCardProps {
  project: {
    id: string
    name: string
    thumbnailColor: string | null
    updatedAt: string
  }
  onDelete: () => void
  onRename: (newName: string) => void
}

function getTimeAgo(dateStr: string): string {
  const diff: number = Date.now() - new Date(dateStr).getTime()
  const minutes: number = Math.floor(diff / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours: number = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days: number = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  const weeks: number = Math.floor(days / 7)
  return `${weeks}w ago`
}

export function ProjectCard({ project, onDelete, onRename }: ProjectCardProps): React.ReactElement {
  const timeAgo: string = getTimeAgo(project.updatedAt)
  const [editing, setEditing] = useState<boolean>(false)
  const [draft, setDraft] = useState<string>(project.name)
  const inputRef = useRef<HTMLInputElement>(null)

  const startEdit = (): void => {
    setDraft(project.name)
    setEditing(true)
    setTimeout(() => { inputRef.current?.select() }, 0)
  }

  const commit = (): void => {
    const trimmed: string = draft.trim()
    if (trimmed !== '' && trimmed !== project.name) {
      onRename(trimmed)
    }
    setEditing(false)
  }

  const cancel = (): void => {
    setDraft(project.name)
    setEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') { e.preventDefault(); commit() }
    if (e.key === 'Escape') { cancel() }
  }

  return (
    <div className="group rounded-xl border border-app-gray-100 bg-white p-5 transition-all hover:shadow-md">
      {/* Color strip */}
      <div
        className="mb-4 h-2 w-full rounded-full"
        style={{ background: project.thumbnailColor ?? '#6B7280' }}
      />

      {/* Brand name */}
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setDraft(e.target.value) }}
          onBlur={commit}
          onKeyDown={handleKeyDown}
          className="w-full rounded border border-app-black px-1.5 py-0.5 text-base font-semibold
                     text-app-black focus:outline-none focus:ring-1 focus:ring-app-black"
          maxLength={80}
          autoFocus
        />
      ) : (
        <div className="flex items-center gap-1.5">
          <h3 className="text-base font-semibold text-app-black">{project.name}</h3>
          <button
            type="button"
            onClick={startEdit}
            className="cursor-pointer text-app-text-muted opacity-0 transition-opacity group-hover:opacity-100
                       hover:text-app-black"
            aria-label="Rename project"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Last edited */}
      <p className="mt-1 text-xs text-app-text-muted">Edited {timeAgo}</p>

      {/* Actions */}
      <div className="mt-4 flex items-center justify-between">
        <Link
          href={`/create?project=${project.id}`}
          className="cursor-pointer rounded-md bg-app-black px-3 py-1.5 text-xs font-medium text-white
                     hover:bg-app-accent-hover transition-colors"
        >
          Open
        </Link>
        <button
          type="button"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault()
            onDelete()
          }}
          className="cursor-pointer text-xs text-app-text-muted hover:text-red-500 transition-colors
                     opacity-0 group-hover:opacity-100"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
