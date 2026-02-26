import { ImageResponse } from 'next/og'
import { getSharedBrand } from '@/lib/share'
import type { ColorPalette } from '@/types/brand'

export const alt: string = 'Brand Style Preview'
export const size = { width: 1200, height: 630 }
export const contentType: string = 'image/png'

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<ImageResponse> {
  const { id } = await params
  const shared = await getSharedBrand(id)

  if (shared === null) {
    return new ImageResponse(
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: '#FFFFFF',
          fontFamily: 'Inter',
          fontSize: 32,
          color: '#6B7280',
        }}
      >
        Brand not found
      </div>,
      { ...size },
    )
  }

  const palette: ColorPalette = shared.state.lightPalette

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        background: palette.bg,
        fontFamily: 'Inter',
      }}
    >
      {/* Brand name */}
      <div
        style={{
          fontSize: 64,
          fontWeight: 800,
          color: palette.text,
          letterSpacing: '-0.02em',
        }}
      >
        {shared.brandName}
      </div>

      {/* Tagline */}
      {shared.state.tagline.length > 0 && (
        <div
          style={{
            fontSize: 24,
            color: palette.textMuted,
            marginTop: 12,
          }}
        >
          {shared.state.tagline}
        </div>
      )}

      {/* Color swatches */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          marginTop: 48,
        }}
      >
        {[
          palette.primary,
          palette.secondary,
          palette.tertiary,
          palette.accent,
          palette.surface,
          palette.border,
        ].map((color: string, i: number) => (
          <div
            key={i}
            style={{
              width: 56,
              height: 56,
              borderRadius: 10,
              background: color,
              border: `1px solid ${palette.border}`,
            }}
          />
        ))}
      </div>

      {/* Font info */}
      <div
        style={{
          fontSize: 16,
          color: palette.textMuted,
          marginTop: 24,
        }}
      >
        {shared.state.headingFont} + {shared.state.bodyFont}
      </div>

      {/* Attribution */}
      <div
        style={{
          fontSize: 14,
          color: palette.textMuted,
          marginTop: 40,
          opacity: 0.6,
        }}
      >
        brandstylegenerator.com
      </div>
    </div>,
    { ...size },
  )
}
