import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Brand Style Generator — Build your brand in minutes'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A0A0A',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background color swatches */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', display: 'flex' }}>
          {['#3B82F6', '#8B5CF6', '#22C55E', '#F97316', '#EF4444', '#EC4899'].map((color: string) => (
            <div key={color} style={{ flex: 1, backgroundColor: color }} />
          ))}
        </div>

        {/* Wordmark */}
        <div
          style={{
            fontSize: '52px',
            fontWeight: '700',
            color: '#FFFFFF',
            letterSpacing: '-1px',
            marginBottom: '16px',
          }}
        >
          Brand Style Generator
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '24px',
            color: '#9CA3AF',
            fontWeight: '400',
            maxWidth: '700px',
            textAlign: 'center',
            lineHeight: '1.5',
          }}
        >
          Pick colors, fonts, and tone. Preview on real mockups.
          Export to CSS, Tailwind, or Figma tokens.
        </div>

        {/* Mini palette demo */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '48px' }}>
          {['#3B82F6', '#8B5CF6', '#22C55E', '#F97316', '#EF4444'].map((color: string) => (
            <div
              key={color}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: color,
              }}
            />
          ))}
        </div>

        {/* Domain */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            fontSize: '16px',
            color: '#4B5563',
            letterSpacing: '0.5px',
          }}
        >
          brandstylegenerator.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
