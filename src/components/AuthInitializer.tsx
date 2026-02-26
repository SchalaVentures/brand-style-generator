'use client'

import { useAuthInit } from '@/hooks/use-auth-init'

interface AuthInitializerProps {
  children: React.ReactNode
}

export function AuthInitializer({ children }: AuthInitializerProps): React.ReactElement {
  useAuthInit()
  return <>{children}</>
}
