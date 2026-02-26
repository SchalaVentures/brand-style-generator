import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import type { DocumentProps } from '@react-pdf/renderer'
import type { BrandState, ColorPalette } from '@/types/brand'
import type { TonePreset } from '@/types/tones'
import { getTonePreset } from '@/data/tones'

interface ColorRole {
  key: keyof ColorPalette
  label: string
}

const COLOR_ROLES: ColorRole[] = [
  // Brand colors
  { key: 'primary', label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'tertiary', label: 'Tertiary' },
  { key: 'accent', label: 'Accent' },
  // Surface colors
  { key: 'bg', label: 'Background' },
  { key: 'surface', label: 'Surface' },
  { key: 'surfaceRaised', label: 'Surface Raised' },
  { key: 'border', label: 'Border' },
  // Text colors
  { key: 'text', label: 'Text' },
  { key: 'textMuted', label: 'Text Muted' },
  // Semantic colors
  { key: 'success', label: 'Success' },
  { key: 'warning', label: 'Warning' },
  { key: 'error', label: 'Error' },
]

const styles = StyleSheet.create({
  page: {
    padding: 48,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    fontSize: 11,
    color: '#111111',
  },
  header: {
    marginBottom: 32,
    textAlign: 'center',
  },
  brandName: {
    fontSize: 36,
    fontWeight: 700,
  },
  tagline: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 16,
    marginTop: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 8,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  colorCard: {
    width: '30%',
    marginBottom: 12,
  },
  colorSwatch: {
    height: 40,
    borderRadius: 6,
    marginBottom: 4,
  },
  colorLabel: {
    fontSize: 9,
    fontWeight: 700,
  },
  colorHex: {
    fontSize: 8,
    color: '#6B7280',
  },
  typographySpec: {
    marginBottom: 16,
  },
  specLabel: {
    fontSize: 9,
    color: '#6B7280',
    marginBottom: 4,
  },
  specSample: {
    fontSize: 24,
  },
  bodySample: {
    fontSize: 11,
    lineHeight: 1.6,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    fontSize: 10,
    fontWeight: 600,
  },
  doCard: {
    flex: 1,
    padding: 12,
    backgroundColor: '#F0FFF4',
    borderLeftWidth: 3,
    borderLeftColor: '#22C55E',
    borderRadius: 4,
  },
  dontCard: {
    flex: 1,
    padding: 12,
    backgroundColor: '#FFF5F5',
    borderLeftWidth: 3,
    borderLeftColor: '#EF4444',
    borderRadius: 4,
  },
  traitCard: {
    flex: 1,
    padding: 16,
    textAlign: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 48,
    right: 48,
    textAlign: 'center',
    fontSize: 8,
    color: '#9CA3AF',
  },
})

export function generatePDFDocument(state: BrandState): React.ReactElement<DocumentProps> {
  const { lightPalette, name, tagline, headingFont, headingWeight, bodyFont, bodyWeight, tonePresetId } = state
  const tone: TonePreset | undefined = tonePresetId !== null ? getTonePreset(tonePresetId) : undefined
  const palette: ColorPalette = lightPalette

  const dateLabel: string = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
  const dateShort: string = new Date().toLocaleDateString()

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.brandName}>{name}</Text>
          {tagline.length > 0 && <Text style={styles.tagline}>{tagline}</Text>}
          <Text style={{ fontSize: 9, color: '#9CA3AF', marginTop: 8 }}>
            Brand Guide v1.0 | {dateLabel}
          </Text>
        </View>

        {/* Colors */}
        <Text style={styles.sectionTitle}>Color Palette</Text>
        <View style={styles.colorGrid}>
          {COLOR_ROLES.map((role: ColorRole) => (
            <View key={role.key} style={styles.colorCard}>
              <View style={[styles.colorSwatch, { backgroundColor: palette[role.key] }]} />
              <Text style={styles.colorLabel}>{role.label}</Text>
              <Text style={styles.colorHex}>{palette[role.key]}</Text>
            </View>
          ))}
        </View>

        {/* Typography */}
        <Text style={styles.sectionTitle}>Typography</Text>
        <View style={styles.typographySpec}>
          <Text style={styles.specLabel}>Heading: {headingFont} {headingWeight}</Text>
          <Text style={styles.specSample}>
            {tone?.copy.heroHeadline ?? 'The smarter way to build.'}
          </Text>
        </View>
        <View style={styles.typographySpec}>
          <Text style={styles.specLabel}>Body: {bodyFont} {bodyWeight}</Text>
          <Text style={styles.bodySample}>
            {tone?.copy.heroSubheadline ?? "Trusted by teams who don't settle for second best."}
          </Text>
        </View>

        {/* Buttons */}
        <Text style={styles.sectionTitle}>Buttons</Text>
        <View style={styles.buttonRow}>
          <View style={[styles.button, { backgroundColor: palette.primary }]}>
            <Text style={{ color: '#FFFFFF', fontSize: 10 }}>Primary</Text>
          </View>
          <View style={[styles.button, { backgroundColor: palette.secondary }]}>
            <Text style={{ color: '#FFFFFF', fontSize: 10 }}>Secondary</Text>
          </View>
          <View style={[styles.button, { borderWidth: 1.5, borderColor: palette.primary }]}>
            <Text style={{ color: palette.primary, fontSize: 10 }}>Outline</Text>
          </View>
        </View>

        {/* Voice & Tone */}
        {tone !== undefined && (
          <>
            <Text style={styles.sectionTitle}>Voice & Tone</Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <View style={styles.doCard}>
                <Text style={{ fontSize: 9, fontWeight: 700, color: '#22C55E', marginBottom: 4 }}>Do</Text>
                <Text style={{ fontSize: 10 }}>{tone.voiceExamples[0].do}</Text>
              </View>
              <View style={styles.dontCard}>
                <Text style={{ fontSize: 9, fontWeight: 700, color: '#EF4444', marginBottom: 4 }}>Don't</Text>
                <Text style={{ fontSize: 10 }}>{tone.voiceExamples[0].dont}</Text>
              </View>
            </View>
          </>
        )}

        {/* Brand Identity */}
        {tone !== undefined && (
          <>
            <Text style={styles.sectionTitle}>Brand Identity</Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              {tone.traits.map((traitName: string, i: number) => (
                <View key={traitName} style={styles.traitCard}>
                  <Text style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{traitName}</Text>
                  <Text style={{ fontSize: 9, color: '#6B7280' }}>{tone.traitDescriptions[i]}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Footer */}
        <Text style={styles.footer}>
          Generated by brandstylegenerator.com | {dateShort}
        </Text>
      </Page>
    </Document>
  )
}
