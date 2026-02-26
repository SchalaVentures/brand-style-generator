'use client'

import { useState, useEffect } from 'react'
import Modal from '@/components/ui/modal'
import { getUserProfile, upsertUserProfile } from '@/lib/profile'
import type { UserProfile, ProfileInput } from '@/lib/profile'

interface ProfileModalProps {
  open: boolean
  onClose: () => void
  userId: string
}

const FIELD_CLASS: string =
  'h-10 w-full rounded-lg border border-app-gray-100 px-3 text-sm text-app-black ' +
  'focus:border-app-black focus:outline-none focus:ring-1 focus:ring-app-black'

const LABEL_CLASS: string = 'mb-1 block text-xs font-medium text-app-text-muted'

export function ProfileModal({ open, onClose, userId }: ProfileModalProps): React.ReactElement {
  const [fullName, setFullName] = useState<string>('')
  const [dateOfBirth, setDateOfBirth] = useState<string>('')
  const [company, setCompany] = useState<string>('')
  const [jobTitle, setJobTitle] = useState<string>('')
  const [website, setWebsite] = useState<string>('')
  const [bio, setBio] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [saving, setSaving] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState<boolean>(false)

  useEffect(() => {
    if (!open) return
    setLoading(true)
    setError(null)
    setSaved(false)
    getUserProfile(userId).then((profile: UserProfile | null) => {
      if (profile !== null) {
        setFullName(profile.fullName ?? '')
        setDateOfBirth(profile.dateOfBirth ?? '')
        setCompany(profile.company ?? '')
        setJobTitle(profile.jobTitle ?? '')
        setWebsite(profile.website ?? '')
        setBio(profile.bio ?? '')
      }
      setLoading(false)
    })
  }, [open, userId])

  const maxDob: string = (() => {
    const d: Date = new Date()
    d.setFullYear(d.getFullYear() - 13)
    return d.toISOString().split('T')[0] ?? ''
  })()

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setError(null)

    if (dateOfBirth !== '' && dateOfBirth > maxDob) {
      setError('You must be at least 13 years old to use this service.')
      return
    }

    setSaving(true)
    try {
      const input: ProfileInput = {
        fullName: fullName.trim() || null,
        dateOfBirth: dateOfBirth || null,
        company: company.trim() || null,
        jobTitle: jobTitle.trim() || null,
        website: website.trim() || null,
        bio: bio.trim() || null,
      }
      await upsertUserProfile(input)
      setSaved(true)
      setTimeout(() => { setSaved(false) }, 2000)
    } catch {
      setError('Failed to save profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Your Profile">
      {loading ? (
        <div className="py-8 text-center text-sm text-app-text-muted">Loading…</div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pb-2">
          {/* Two-column row: Full Name + Date of Birth */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="profile-full-name" className={LABEL_CLASS}>Full Name</label>
              <input
                id="profile-full-name"
                type="text"
                value={fullName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setFullName(e.target.value) }}
                className={FIELD_CLASS}
                placeholder="Jane Smith"
              />
            </div>
            <div>
              <label htmlFor="profile-dob" className={LABEL_CLASS}>Date of Birth</label>
              <input
                id="profile-dob"
                type="date"
                value={dateOfBirth}
                max={maxDob}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setDateOfBirth(e.target.value) }}
                className={FIELD_CLASS}
              />
            </div>
          </div>

          {/* Two-column row: Company + Job Title */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="profile-company" className={LABEL_CLASS}>Company</label>
              <input
                id="profile-company"
                type="text"
                value={company}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setCompany(e.target.value) }}
                className={FIELD_CLASS}
                placeholder="Acme Inc."
              />
            </div>
            <div>
              <label htmlFor="profile-job-title" className={LABEL_CLASS}>Job Title</label>
              <input
                id="profile-job-title"
                type="text"
                value={jobTitle}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setJobTitle(e.target.value) }}
                className={FIELD_CLASS}
                placeholder="Designer"
              />
            </div>
          </div>

          {/* Website */}
          <div>
            <label htmlFor="profile-website" className={LABEL_CLASS}>Website</label>
            <input
              id="profile-website"
              type="url"
              value={website}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setWebsite(e.target.value) }}
              className={FIELD_CLASS}
              placeholder="https://yoursite.com"
            />
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="profile-bio" className={LABEL_CLASS}>Bio</label>
            <textarea
              id="profile-bio"
              value={bio}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setBio(e.target.value) }}
              rows={3}
              className="w-full resize-none rounded-lg border border-app-gray-100 px-3 py-2.5 text-sm text-app-black
                         focus:border-app-black focus:outline-none focus:ring-1 focus:ring-app-black"
              placeholder="A short bio…"
            />
          </div>

          {error !== null && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="h-10 cursor-pointer rounded-lg bg-app-black text-sm font-semibold text-white
                       hover:bg-app-gray-600 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving…' : saved ? 'Saved!' : 'Save Profile'}
          </button>
        </form>
      )}
    </Modal>
  )
}
