import { nanoid } from 'nanoid'
import { gqlRequest } from '@/lib/nhost'

// In-memory rate limiter: max 10 share link creations per IP per hour
const RATE_LIMIT = 10
const WINDOW_MS = 60 * 60 * 1000 // 1 hour

const ipTimestamps = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now: number = Date.now()
  const cutoff: number = now - WINDOW_MS
  const timestamps: number[] = (ipTimestamps.get(ip) ?? []).filter((t: number) => t > cutoff)
  if (timestamps.length >= RATE_LIMIT) return true
  timestamps.push(now)
  ipTimestamps.set(ip, timestamps)
  return false
}

function getClientIp(request: Request): string {
  return (
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  )
}

// NOTE: Requires T5.01 (database migrations). shared_links table must exist.
// GraphQL root field names follow the project's camelCase custom_root_fields convention.

interface UpsertSharedLinkResponse {
  insertSharedLink: { id: string } | null
}

// on_conflict update_columns uses GraphQL alias names (not raw DB column names)
// projectId is nullable — NULL values never conflict, so unsaved brands always insert a new row
const UPSERT_SHARED_LINK: string = `
  mutation UpsertSharedLink(
    $id: String!
    $state: jsonb!
    $brandName: String!
    $primaryColor: String
    $projectId: uuid
  ) {
    insertSharedLink(
      object: {
        id: $id
        state: $state
        brandName: $brandName
        primaryColor: $primaryColor
        projectId: $projectId
      }
      on_conflict: {
        constraint: shared_links_project_id_key
        update_columns: [state, brandName, primaryColor]
      }
    ) {
      id
    }
  }
`

export async function POST(request: Request): Promise<Response> {
  const ip: string = getClientIp(request)
  if (isRateLimited(ip)) {
    return Response.json({ error: 'Too many requests. Try again later.' }, { status: 429 })
  }

  try {
    const body: unknown = await request.json()

    if (
      typeof body !== 'object' ||
      body === null ||
      !('state' in body) ||
      !('brandName' in body)
    ) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { state, brandName, primaryColor, projectId } = body as {
      state: unknown
      brandName: string
      primaryColor?: string | null
      projectId?: string | null
    }

    if (state === undefined || state === null || typeof brandName !== 'string' || brandName.length === 0) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const id: string = nanoid(8)

    const data: UpsertSharedLinkResponse = await gqlRequest<UpsertSharedLinkResponse>(
      UPSERT_SHARED_LINK,
      {
        id,
        state,
        brandName,
        primaryColor: primaryColor ?? null,
        projectId: projectId ?? null,
      },
    )

    if (data.insertSharedLink === null || data.insertSharedLink === undefined) {
      return Response.json({ error: 'Failed to create share link' }, { status: 500 })
    }

    // Return the actual id from the DB (may differ from `id` if an existing link was updated via upsert)
    const resultId: string = data.insertSharedLink.id
    return Response.json({ id: resultId, url: `/share/${resultId}` })
  } catch (err: unknown) {
    console.error('Share API error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
