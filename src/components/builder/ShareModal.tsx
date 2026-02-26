'use client'

import { useState } from 'react'
import { Copy, Check, Twitter, Facebook, Linkedin } from 'lucide-react'
import Modal from '@/components/ui/modal'

interface ShareModalProps {
  open: boolean
  onClose: () => void
  shareUrl: string
  brandName: string
}

export function ShareModal({ open, onClose, shareUrl, brandName }: ShareModalProps): React.ReactElement {
  const [copied, setCopied] = useState<boolean>(false)

  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => { setCopied(false) }, 2500)
  }

  const encodedUrl: string = encodeURIComponent(shareUrl)
  const encodedText: string = encodeURIComponent(`Check out ${brandName}'s brand style guide`)

  const socialLinks: { label: string; icon: React.ReactNode; href: string }[] = [
    {
      label: 'Twitter',
      icon: <Twitter className="h-4 w-4" />,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    },
    {
      label: 'Facebook',
      icon: <Facebook className="h-4 w-4" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: 'LinkedIn',
      icon: <Linkedin className="h-4 w-4" />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ]

  return (
    <Modal open={open} onClose={onClose} title="Share Your Brand">
      <div className="flex flex-col gap-5">
        {/* URL copy field */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-app-text-muted">
            Share link
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="h-10 flex-1 rounded-lg border border-app-gray-100 bg-app-gray-50 px-3
                         font-mono text-sm text-app-black focus:outline-none"
              onClick={(e) => { (e.target as HTMLInputElement).select() }}
            />
            <button
              type="button"
              onClick={handleCopy}
              className="flex h-10 cursor-pointer items-center gap-1.5 rounded-lg bg-app-black px-4 text-sm
                         font-medium text-white hover:bg-app-black/90 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Social sharing */}
        <div>
          <p className="mb-2 text-xs font-medium text-app-text-muted">
            Share on social
          </p>
          <div className="flex gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border
                           border-app-gray-100 text-sm font-medium text-app-black
                           hover:bg-app-gray-50 transition-colors"
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}
