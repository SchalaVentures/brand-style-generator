'use client'

import Modal from './modal'

interface ConfirmModalProps {
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  destructive?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  destructive = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps): React.ReactElement {
  return (
    <Modal open={open} onClose={onCancel} title={title}>
      <div className="flex flex-col gap-5">
        <p className="text-sm text-app-text-muted">{description}</p>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded-lg border border-app-gray-100 px-4 py-2 text-sm font-medium
                       text-app-black hover:bg-app-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors ${
              destructive
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-app-black hover:bg-app-gray-600'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  )
}
