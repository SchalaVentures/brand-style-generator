import { gqlRequest } from '@/lib/nhost'
import type { BrandState } from '@/types/brand'

function resolveDisplayColor(state: Pick<BrandState, 'colorType' | 'gradientCSS' | 'primaryColor'>): string | null {
  if (state.colorType === 'gradient' && state.gradientCSS !== null) return state.gradientCSS
  return state.primaryColor ?? null
}

// GraphQL root field names follow camelCase custom_root_fields convention
// (see nhost/metadata/databases/default/tables/public_brand_projects.yaml)

interface InsertBrandProjectResponse {
  insertBrandProject: { id: string; createdAt: string; updatedAt: string } | null
}

interface UpdateBrandProjectResponse {
  updateBrandProject: { id: string; updatedAt: string } | null
}

interface GetBrandProjectResponse {
  brandProject: {
    id: string
    name: string
    state: BrandState
    thumbnailColor: string | null
    createdAt: string
    updatedAt: string
  } | null
}

interface BrandProjectRow {
  id: string
  name: string
  thumbnailColor: string | null
  state: Pick<BrandState, 'colorType' | 'gradientCSS' | 'primaryColor'>
  updatedAt: string
}

interface GetBrandProjectsResponse {
  brandProjects: BrandProjectRow[]
}

interface DeleteBrandProjectResponse {
  deleteBrandProject: { id: string } | null
}

interface RenameBrandProjectResponse {
  updateBrandProject: { id: string } | null
}

const INSERT_PROJECT: string = `
  mutation InsertBrandProject($name: String!, $state: jsonb!, $thumbnailColor: String) {
    insertBrandProject(object: {
      name: $name
      state: $state
      thumbnailColor: $thumbnailColor
    }) {
      id
      createdAt
      updatedAt
    }
  }
`

const UPDATE_PROJECT: string = `
  mutation UpdateBrandProject($id: uuid!, $name: String!, $state: jsonb!, $thumbnailColor: String) {
    updateBrandProject(
      pk_columns: { id: $id }
      _set: {
        name: $name
        state: $state
        thumbnailColor: $thumbnailColor
      }
    ) {
      id
      updatedAt
    }
  }
`

const GET_PROJECT: string = `
  query GetBrandProject($id: uuid!) {
    brandProject(id: $id) {
      id
      name
      state
      thumbnailColor
      createdAt
      updatedAt
    }
  }
`

const GET_USER_PROJECTS: string = `
  query GetBrandProjects {
    brandProjects(order_by: { updatedAt: desc }) {
      id
      name
      thumbnailColor
      state
      updatedAt
    }
  }
`

const RENAME_PROJECT: string = `
  mutation RenameBrandProject($id: uuid!, $name: String!) {
    updateBrandProject(
      pk_columns: { id: $id }
      _set: { name: $name }
    ) {
      id
    }
  }
`

const DELETE_PROJECT: string = `
  mutation DeleteBrandProject($id: uuid!) {
    deleteBrandProject(id: $id) {
      id
    }
  }
`

export async function saveProject(
  state: BrandState,
  projectId: string | null,
): Promise<{ id: string; isNew: boolean }> {
  const variables = {
    name: state.name || 'Untitled Brand',
    state,
    thumbnailColor: state.colorType === 'gradient' && state.gradientCSS !== null
      ? state.gradientCSS
      : state.primaryColor,
  }

  if (projectId !== null) {
    const response: UpdateBrandProjectResponse = await gqlRequest<UpdateBrandProjectResponse>(
      UPDATE_PROJECT,
      { ...variables, id: projectId },
    )
    if (response.updateBrandProject === null || response.updateBrandProject === undefined) {
      throw new Error('Failed to save project')
    }
    return { id: projectId, isNew: false }
  }

  const response: InsertBrandProjectResponse = await gqlRequest<InsertBrandProjectResponse>(
    INSERT_PROJECT,
    variables,
  )
  if (response.insertBrandProject === null || response.insertBrandProject === undefined) {
    throw new Error('Failed to create project')
  }
  return { id: response.insertBrandProject.id, isNew: true }
}

export async function loadProject(id: string): Promise<BrandState | null> {
  try {
    const response: GetBrandProjectResponse = await gqlRequest<GetBrandProjectResponse>(
      GET_PROJECT,
      { id },
    )
    if (response.brandProject === null || response.brandProject === undefined) {
      return null
    }
    return response.brandProject.state
  } catch (err: unknown) {
    console.error('loadProject failed:', err)
    return null
  }
}

export interface ProjectListItem {
  id: string
  name: string
  thumbnailColor: string | null
  updatedAt: string
}

export async function getUserProjects(): Promise<ProjectListItem[]> {
  try {
    const response: GetBrandProjectsResponse = await gqlRequest<GetBrandProjectsResponse>(
      GET_USER_PROJECTS,
    )
    return (response.brandProjects ?? []).map((p: BrandProjectRow) => ({
      id: p.id,
      name: p.name,
      thumbnailColor: resolveDisplayColor(p.state),
      updatedAt: p.updatedAt,
    }))
  } catch (err: unknown) {
    console.error('getUserProjects failed:', err)
    return []
  }
}

export async function renameProject(id: string, name: string): Promise<boolean> {
  try {
    await gqlRequest<RenameBrandProjectResponse>(RENAME_PROJECT, { id, name })
    return true
  } catch (err: unknown) {
    console.error('renameProject failed:', err)
    return false
  }
}

export async function deleteProject(id: string): Promise<boolean> {
  try {
    await gqlRequest<DeleteBrandProjectResponse>(DELETE_PROJECT, { id })
    return true
  } catch (err: unknown) {
    console.error('deleteProject failed:', err)
    return false
  }
}
