import { Suspense } from 'react'
import type { Metadata } from 'next'
import { ResetPasswordClient } from './ResetPasswordClient'

export const metadata: Metadata = {
  title: 'Reset Password',
  robots: { index: false, follow: false },
}

export default function ResetPasswordPage(): React.ReactElement {
  return (
    <Suspense>
      <ResetPasswordClient />
    </Suspense>
  )
}
