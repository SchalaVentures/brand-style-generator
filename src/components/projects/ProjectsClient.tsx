'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { nhost, signOut } from '@/lib/nhost'
import { getUserProjects, deleteProject, renameProject } from '@/lib/projects'
import type { ProjectListItem } from '@/lib/projects'
import { getUserProfile } from '@/lib/profile'
import { ProjectCard } from './ProjectCard'
import { UpgradeBanner } from '@/components/auth/UpgradeBanner'
import { AuthModal } from '@/components/auth/AuthModal'
import { ProfileModal } from '@/components/profile/ProfileModal'
import { ConfirmModal } from '@/components/ui/confirm-modal'
import { useAuthState } from '@/hooks/use-auth-state'
import { useBrandStore } from '@/store/brand-store'

export function ProjectsClient(): React.ReactElement {
  const [projects, setProjects] = useState<ProjectListItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false)
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
  const [displayName, setDisplayName] = useState<string>('Account')
  const menuRef = useRef<HTMLDivElement>(null)
  const authState = useAuthState()
  const resetAll = useBrandStore((s) => s.resetAll)
  const router = useRouter()

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent): void => {
      if (menuRef.current !== null && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => { document.removeEventListener('mousedown', handleOutside) }
  }, [])

  const handleSignOut = async (): Promise<void> => {
    setMenuOpen(false)
    await signOut()
    resetAll()
    router.push('/')
  }

  useEffect(() => {
    const load = async (): Promise<void> => {
      const session = nhost.getUserSession()
      if (session === null) {
        window.location.href = '/create'
        return
      }

      const user = session.user
      const [data, profile] = await Promise.all([
        getUserProjects(),
        user !== undefined && !user.isAnonymous ? getUserProfile(user.id) : Promise.resolve(null),
      ])

      setProjects(data)

      if (profile?.fullName !== null && profile?.fullName !== undefined && profile.fullName.trim() !== '') {
        setDisplayName(profile.fullName.trim())
      } else if (user !== undefined && !user.isAnonymous && user.email !== undefined) {
        setDisplayName(user.email.split('@')[0] ?? 'Account')
      }

      setLoading(false)
    }
    load()
  }, [])

  const handleDeleteConfirmed = async (): Promise<void> => {
    if (deleteTargetId === null) return
    const id: string = deleteTargetId
    setDeleteTargetId(null)
    const success: boolean = await deleteProject(id)
    if (success) {
      setProjects((prev: ProjectListItem[]) => prev.filter((p: ProjectListItem) => p.id !== id))
    }
  }

  const handleRename = async (id: string, newName: string): Promise<void> => {
    const success: boolean = await renameProject(id, newName)
    if (success) {
      setProjects((prev: ProjectListItem[]) =>
        prev.map((p: ProjectListItem) => p.id === id ? { ...p, name: newName } : p)
      )
    }
  }

  return (
    <div className="min-h-screen bg-app-bg-alt">
      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b border-app-gray-100 bg-white px-6">
        <Link
          href="/"
          className="cursor-pointer text-sm font-medium text-app-text-muted hover:text-app-black transition-colors"
        >
          Brand Style Generator
        </Link>
        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => { setMenuOpen((o: boolean) => !o) }}
            className="cursor-pointer flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium
                       text-app-text-muted hover:bg-app-gray-50 hover:text-app-black transition-colors"
          >
            <span>{displayName}</span>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-150 ${menuOpen ? 'rotate-180' : ''}`} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-48 overflow-hidden rounded-xl border border-app-gray-100 bg-white shadow-dropdown">
              {authState.isAuthenticated && !authState.isAnonymous && (
                <button
                  type="button"
                  onClick={() => { setMenuOpen(false); setShowProfileModal(true) }}
                  className="flex w-full cursor-pointer items-center px-4 py-2.5 text-sm text-app-black
                             hover:bg-app-gray-50 transition-colors"
                >
                  Edit Profile
                </button>
              )}
              <button
                type="button"
                onClick={() => { void handleSignOut() }}
                className="flex w-full cursor-pointer items-center px-4 py-2.5 text-sm text-red-500
                           hover:bg-red-50 transition-colors"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* Upgrade banner for anonymous users */}
        {authState.isAuthenticated && authState.isAnonymous && (
          <div className="mb-6">
            <UpgradeBanner onUpgrade={() => { setShowAuthModal(true) }} />
          </div>
        )}

        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-app-black">My Brand Projects</h1>
          <button
            type="button"
            onClick={() => { resetAll(); router.push('/create') }}
            className="cursor-pointer rounded-lg bg-app-black px-4 py-2 text-sm font-semibold text-white
                       hover:bg-app-accent-hover transition-colors"
          >
            + New Project
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-app-text-muted">Loading\u2026</div>
        ) : projects.length === 0 ? (
          <div className="py-12 text-center">
            <p className="mb-4 text-app-text-muted">No projects yet.</p>
            <Link
              href="/create"
              className="cursor-pointer text-sm font-medium text-app-black hover:underline"
            >
              Create your first brand
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project: ProjectListItem) => (
              <ProjectCard
                key={project.id}
                project={project}
                onDelete={() => { setDeleteTargetId(project.id) }}
                onRename={(newName: string) => { void handleRename(project.id, newName) }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Delete confirm modal */}
      <ConfirmModal
        open={deleteTargetId !== null}
        title="Delete project?"
        description="This will permanently delete the project. This cannot be undone."
        confirmLabel="Delete"
        destructive
        onConfirm={() => { void handleDeleteConfirmed() }}
        onCancel={() => { setDeleteTargetId(null) }}
      />

      {/* Auth modal for upgrade */}
      <AuthModal
        open={showAuthModal}
        onClose={() => { setShowAuthModal(false) }}
        onSuccess={() => { setShowAuthModal(false) }}
      />

      {/* Profile modal */}
      {authState.userId !== null && (
        <ProfileModal
          open={showProfileModal}
          onClose={() => {
            setShowProfileModal(false)
            // Refresh display name in case user updated their full name
            if (authState.userId !== null) {
              getUserProfile(authState.userId).then((profile) => {
                if (profile?.fullName !== null && profile?.fullName !== undefined && profile.fullName.trim() !== '') {
                  setDisplayName(profile.fullName.trim())
                }
              })
            }
          }}
          userId={authState.userId}
        />
      )}
    </div>
  )
}
