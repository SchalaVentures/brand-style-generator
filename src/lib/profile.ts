import { gqlRequest } from '@/lib/nhost'

export interface UserProfile {
  userId: string
  fullName: string | null
  dateOfBirth: string | null
  company: string | null
  jobTitle: string | null
  website: string | null
  bio: string | null
}

export interface ProfileInput {
  fullName: string | null
  dateOfBirth: string | null
  company: string | null
  jobTitle: string | null
  website: string | null
  bio: string | null
}

interface GetUserProfileResponse {
  userProfile: UserProfile | null
}

interface UpsertUserProfileResponse {
  insertUserProfile: UserProfile | null
}

const GET_PROFILE: string = `
  query GetUserProfile($userId: uuid!) {
    userProfile(userId: $userId) {
      userId
      fullName
      dateOfBirth
      company
      jobTitle
      website
      bio
    }
  }
`

const UPSERT_PROFILE: string = `
  mutation UpsertUserProfile(
    $fullName: String
    $dateOfBirth: date
    $company: String
    $jobTitle: String
    $website: String
    $bio: String
  ) {
    insertUserProfile(
      object: {
        fullName: $fullName
        dateOfBirth: $dateOfBirth
        company: $company
        jobTitle: $jobTitle
        website: $website
        bio: $bio
      }
      on_conflict: {
        constraint: user_profiles_pkey
        update_columns: [fullName, dateOfBirth, company, jobTitle, website, bio]
      }
    ) {
      userId
      fullName
      dateOfBirth
      company
      jobTitle
      website
      bio
    }
  }
`

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const response: GetUserProfileResponse = await gqlRequest<GetUserProfileResponse>(
      GET_PROFILE,
      { userId },
    )
    return response.userProfile ?? null
  } catch (err: unknown) {
    console.error('getUserProfile failed:', err)
    return null
  }
}

export async function upsertUserProfile(input: ProfileInput): Promise<UserProfile | null> {
  const response: UpsertUserProfileResponse = await gqlRequest<UpsertUserProfileResponse>(
    UPSERT_PROFILE,
    {
      fullName: input.fullName ?? null,
      dateOfBirth: input.dateOfBirth ?? null,
      company: input.company ?? null,
      jobTitle: input.jobTitle ?? null,
      website: input.website ?? null,
      bio: input.bio ?? null,
    },
  )
  return response.insertUserProfile ?? null
}
