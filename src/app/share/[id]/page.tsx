import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getSharedBrand } from '@/lib/share'
import { SharedViewClient } from '@/components/shared/SharedViewClient'

interface SharePageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: SharePageProps): Promise<Metadata> {
  const { id } = await params
  const shared = await getSharedBrand(id)

  if (shared === null) {
    return { title: 'Brand Not Found' }
  }

  return {
    title: `${shared.brandName} | Brand Style | brandstylegenerator.com`,
    description: `View the brand style for ${shared.brandName}. Colors, typography, and tone, previewed on realistic mockups.`,
    openGraph: {
      title: `${shared.brandName} | Brand Style`,
      description: `View the brand style for ${shared.brandName}.`,
      type: 'website',
    },
  }
}

export default async function SharePage({ params }: SharePageProps): Promise<React.ReactElement> {
  const { id } = await params
  const shared = await getSharedBrand(id)

  if (shared === null) {
    return notFound()
  }

  return <SharedViewClient brandState={shared.state} brandName={shared.brandName} />
}
