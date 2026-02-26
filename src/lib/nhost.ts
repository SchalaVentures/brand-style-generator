import type { NhostClient } from '@nhost/nhost-js'
import { createClient } from '@nhost/nhost-js'
import type { FetchResponse } from '@nhost/nhost-js/fetch'
import type { Session } from '@nhost/nhost-js/session'
import type { User, SignInEmailPasswordResponse } from '@nhost/nhost-js/auth'

export type { FetchResponse, Session, User, SignInEmailPasswordResponse }

export const nhost: NhostClient = createClient({
  subdomain: process.env['NHOST_SUBDOMAIN'] ?? 'local',
  region: process.env['NHOST_REGION'] ?? 'local',
})

export const auth: NhostClient['auth'] = nhost.auth
export const storage: NhostClient['storage'] = nhost.storage
export const functions: NhostClient['functions'] = nhost.functions

interface GraphQLResponseBody<T> {
  data?: T
  errors?: { message: string }[]
}

type GraphQLFetchResponse = FetchResponse<GraphQLResponseBody<unknown>>

export function getSession(): Session | null {
  return nhost.getUserSession()
}

export function getUser(): User | null {
  const session: Session | null = nhost.getUserSession()
  return session?.user ?? null
}

export function clearSession(): void {
  nhost.clearSession()
}

export async function signOut(): Promise<void> {
  try {
    const session: Session | null = nhost.getUserSession()
    if (session?.refreshTokenId !== undefined && session.refreshTokenId !== '') {
      await auth.signOut({ refreshToken: session.refreshTokenId })
    }
  } catch {
    // Ignore signout errors — clear local state regardless
  }
  nhost.clearSession()
}

export async function gqlRequest<TData>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<TData> {
  const response: GraphQLFetchResponse = await nhost.graphql.request({
    query,
    variables,
  })

  const body: GraphQLResponseBody<TData> = response.body as GraphQLResponseBody<TData>

  if (body.errors !== undefined && body.errors.length > 0) {
    const message: string = body.errors[0]?.message ?? 'GraphQL error'
    throw new Error(message)
  }

  if (body.data === undefined) {
    throw new Error('No data returned from GraphQL')
  }

  return body.data
}
