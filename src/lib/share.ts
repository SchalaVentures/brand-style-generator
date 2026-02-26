import { gqlRequest } from '@/lib/nhost'
import type { BrandState } from '@/types/brand'

// NOTE: Requires T5.01 (database migrations). shared_links table must exist.
// GraphQL root field names follow the project's camelCase custom_root_fields convention.

interface SharedLinkRecord {
  id: string
  state: BrandState
  brandName: string
  primaryColor: string | null
  createdAt: string
}

interface GetSharedLinkResponse {
  sharedLink: SharedLinkRecord | null
}

interface IncrementViewCountResponse {
  updateSharedLink: { viewCount: number } | null
}

const GET_SHARED_LINK: string = `
  query GetSharedLink($id: String!) {
    sharedLink(id: $id) {
      id
      state
      brandName
      primaryColor
      createdAt
    }
  }
`

const INCREMENT_VIEW_COUNT: string = `
  mutation IncrementViewCount($id: String!) {
    updateSharedLink(
      pk_columns: { id: $id },
      _inc: { viewCount: 1 }
    ) {
      viewCount
    }
  }
`

export async function getSharedBrand(id: string): Promise<{
  state: BrandState
  brandName: string
  primaryColor: string | null
} | null> {
  try {
    const data: GetSharedLinkResponse = await gqlRequest<GetSharedLinkResponse>(
      GET_SHARED_LINK,
      { id },
    )

    if (data.sharedLink === null || data.sharedLink === undefined) {
      return null
    }

    // Increment view count — fire and forget, don't block the response
    gqlRequest<IncrementViewCountResponse>(INCREMENT_VIEW_COUNT, { id }).catch(() => {})

    return {
      state: data.sharedLink.state,
      brandName: data.sharedLink.brandName,
      primaryColor: data.sharedLink.primaryColor,
    }
  } catch (err: unknown) {
    console.error('getSharedBrand failed:', err)
    return null
  }
}
