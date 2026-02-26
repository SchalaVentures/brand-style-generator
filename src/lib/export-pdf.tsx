import { Document, Page, Text, View, StyleSheet, Svg, Defs, Stop, LinearGradient as SvgLinearGradient, Rect } from '@react-pdf/renderer'
import type { DocumentProps } from '@react-pdf/renderer'
import type { BrandState, ColorPalette } from '@/types/brand'
import type { TonePreset } from '@/types/tones'
import { getTonePreset } from '@/data/tones'
import { contrastRatio } from '@/lib/contrast'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function textOnSwatch(hex: string): string {
  return contrastRatio(hex, '#FFFFFF') >= 4.5 ? '#FFFFFF' : '#111111'
}

function domainFromName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 20) || 'yourbrand'
}

// ─── Color role definitions ───────────────────────────────────────────────────

interface ColorRole {
  key: keyof ColorPalette
  label: string
  desc: string
}

const BRAND_COLORS: ColorRole[] = [
  { key: 'primary', label: 'Primary', desc: 'CTAs, headers, brand presence' },
  { key: 'secondary', label: 'Secondary', desc: 'Supporting elements' },
  { key: 'tertiary', label: 'Tertiary', desc: 'Subtle accents' },
  { key: 'accent', label: 'Accent', desc: 'Highlights, badges' },
]

const SURFACE_TEXT_COLORS: ColorRole[] = [
  { key: 'bg', label: 'Background', desc: 'Page background' },
  { key: 'surface', label: 'Surface', desc: 'Cards, elevated content' },
  { key: 'surfaceRaised', label: 'Raised', desc: 'Modals, dropdowns' },
  { key: 'border', label: 'Border', desc: 'Dividers' },
  { key: 'text', label: 'Text', desc: 'Headings, body' },
  { key: 'textMuted', label: 'Text Muted', desc: 'Labels, captions' },
]

const SEMANTIC_COLORS: ColorRole[] = [
  { key: 'success', label: 'Success', desc: 'Positive states' },
  { key: 'warning', label: 'Warning', desc: 'Caution states' },
  { key: 'error', label: 'Error', desc: 'Error states' },
]

const WEIGHT_SHOWCASE: number[] = [400, 500, 600, 700]

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  page: { padding: 48, fontFamily: 'Helvetica', fontSize: 11 },
  // Brand guide
  header: { marginBottom: 8, textAlign: 'center', paddingBottom: 20, borderBottomWidth: 1 },
  brandName: { fontSize: 36, fontWeight: 700 },
  tagline: { fontSize: 13, marginTop: 6 },
  section: { marginTop: 28, paddingTop: 20, borderTopWidth: 1 },
  sectionTitle: { fontSize: 16, fontWeight: 700, marginBottom: 14 },
  wordmarkGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  wordmarkCard: { width: '48%', padding: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 8, marginBottom: 8 },
  wordmarkName: { fontSize: 18, fontWeight: 700 },
  wordmarkSub: { fontSize: 9, marginTop: 4 },
  primarySwatch: { height: 60, borderRadius: 8, padding: 12, justifyContent: 'flex-end', marginBottom: 10 },
  gradientStopsRow: { flexDirection: 'row', height: 24, borderRadius: 4, marginBottom: 10 },
  gradientStop: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  brandColorRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  brandColorCard: { flex: 1, borderRadius: 6, borderWidth: 0.5 },
  brandColorSwatch: { height: 40, padding: 6, justifyContent: 'flex-end' },
  brandColorInfo: { padding: 6 },
  surfaceRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 14 },
  surfaceItem: { flexDirection: 'row', alignItems: 'center', gap: 6, width: '30%', marginBottom: 4 },
  surfaceDot: { width: 22, height: 22, borderRadius: 4, borderWidth: 0.5 },
  semanticRow: { flexDirection: 'row', gap: 16 },
  semanticItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  semanticDot: { width: 12, height: 12, borderRadius: 6 },
  typographyCard: { borderRadius: 6, padding: 14, marginBottom: 10, borderWidth: 0.5 },
  typographyMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 },
  typographyMetaLabel: { fontSize: 8, fontWeight: 700 },
  typographyMetaDetail: { fontSize: 8 },
  weightRow: { flexDirection: 'row', gap: 20, marginTop: 10 },
  weightItem: { alignItems: 'center' },
  buttonSurface: { flexDirection: 'row', gap: 10, padding: 14, borderRadius: 8, borderWidth: 0.5, marginBottom: 10, flexWrap: 'wrap' },
  btn: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 6 },
  voiceRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  voiceCard: { flex: 1, padding: 10, borderRadius: 6, borderLeftWidth: 2.5 },
  toneTableRow: { flexDirection: 'row', borderTopWidth: 0.5, paddingVertical: 6, paddingHorizontal: 8 },
  traitRow: { flexDirection: 'row', gap: 10 },
  traitCard: { flex: 1, padding: 14, borderRadius: 8, alignItems: 'center', borderWidth: 0.5 },
  footer: { position: 'absolute', bottom: 20, left: 48, right: 48, textAlign: 'center', fontSize: 8 },
  // Mockup pages
  mockupPageHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  mockupPageBrand: { fontSize: 13, fontWeight: 700 },
  mockupPageLabel: { fontSize: 9, color: '#9CA3AF' },
  mockupPairRow: { flexDirection: 'row', gap: 12 },
  mockupModeLabel: { fontSize: 7, fontWeight: 700, color: '#9CA3AF', marginBottom: 6, letterSpacing: 0.5 },
  // Browser chrome
  browserFrame: { borderRadius: 8, borderWidth: 0.5, borderColor: '#E5E7EB', overflow: 'hidden' },
  browserBar: { height: 22, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 8, backgroundColor: '#F5F5F5', borderBottomWidth: 0.5, borderBottomColor: '#E5E7EB' },
  browserDots: { flexDirection: 'row', gap: 3 },
  browserDot: { width: 6, height: 6, borderRadius: 3 },
  browserUrl: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 3, paddingVertical: 2, paddingHorizontal: 6, borderWidth: 0.5, borderColor: '#E5E7EB' },
  mockupPage: { padding: 24, fontFamily: 'Helvetica', fontSize: 11 },
  // Phone frame
  phoneOuter: { width: 220, borderWidth: 5, borderColor: '#111111', borderRadius: 30, alignSelf: 'center', overflow: 'hidden' },
  phoneStatusBar: { height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14 },
  phoneHomeBar: { height: 18, alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 5 },
  phoneHomeIndicator: { width: 44, height: 3, borderRadius: 2 },
})

// ─── Shared sub-components ────────────────────────────────────────────────────

interface PdfSectionProps {
  title: string
  palette: ColorPalette
  children: React.ReactNode
}

function PdfSection({ title, palette, children }: PdfSectionProps): React.ReactElement {
  return (
    <View style={[s.section, { borderTopColor: palette.border }]}>
      <Text style={[s.sectionTitle, { color: palette.text }]}>{title}</Text>
      {children}
    </View>
  )
}

interface SectionLabelProps {
  text: string
  palette: ColorPalette
}

function SectionLabel({ text, palette }: SectionLabelProps): React.ReactElement {
  return (
    <Text style={{ fontSize: 8, fontWeight: 700, color: palette.textMuted, marginBottom: 6, letterSpacing: 0.5 }}>
      {text}
    </Text>
  )
}

// ─── Browser chrome wrapper ──────────────────────────────────────────────────

interface BrowserChromeProps {
  url: string
  children: React.ReactNode
  bg: string
}

function BrowserChrome({ url, children, bg }: BrowserChromeProps): React.ReactElement {
  return (
    <View style={[s.browserFrame, { backgroundColor: bg }]}>
      <View style={s.browserBar}>
        <View style={s.browserDots}>
          <View style={[s.browserDot, { backgroundColor: '#FF5F57' }]} />
          <View style={[s.browserDot, { backgroundColor: '#FEBC2E' }]} />
          <View style={[s.browserDot, { backgroundColor: '#28C840' }]} />
        </View>
        <View style={s.browserUrl}>
          <Text style={{ fontSize: 5, color: '#9CA3AF', textAlign: 'center' }}>{url}</Text>
        </View>
      </View>
      {children}
    </View>
  )
}

// ─── Gradient background helper ───────────────────────────────────────────────

// Renders an SVG gradient rect — used as a background layer inside a position:relative View.
// Each call needs a unique `id` since SVG defs are document-scoped.
let gradientIdCounter: number = 0

function GradientRect({ stops, width, height, borderRadius }: { stops: string[]; width: number; height: number; borderRadius?: number }): React.ReactElement {
  const r: number = borderRadius ?? 0
  const id: string = `g${gradientIdCounter++}`
  return (
    <Svg style={{ position: 'absolute', top: 0, left: 0 }} width={width} height={height}>
      <Defs>
        <SvgLinearGradient id={id} x1="0" y1="0" x2={String(width)} y2="0" gradientUnits="userSpaceOnUse">
          {stops.map((color: string, i: number) => (
            <Stop key={i} offset={`${(i / Math.max(stops.length - 1, 1)) * 100}%`} stopColor={color} />
          ))}
        </SvgLinearGradient>
      </Defs>
      <Rect x="0" y="0" width={String(width)} height={String(height)} rx={String(r)} ry={String(r)} fill={`url(#${id})`} />
    </Svg>
  )
}

// A primary-colored View that supports gradient backgrounds.
// For solid colors, renders a simple backgroundColor. For gradients, overlays an SVG rect.
interface PrimaryBoxProps {
  solid: string
  stops: string[] | null
  isGradient: boolean
  width: number
  height: number
  borderRadius?: number
  style?: Record<string, unknown>
  children: React.ReactNode
}

function PrimaryBox({ solid, stops, isGradient, width, height, borderRadius, style, children }: PrimaryBoxProps): React.ReactElement {
  const useGradient: boolean = isGradient && stops !== null && stops.length >= 2
  const r: number = borderRadius ?? 0
  return (
    <View style={{ width, height, borderRadius: r, position: 'relative', overflow: 'hidden', backgroundColor: useGradient ? 'transparent' : solid, ...style }}>
      {useGradient && stops !== null && <GradientRect stops={stops} width={width} height={height} borderRadius={r} />}
      <View style={{ position: 'absolute', top: 0, left: 0, width, height, alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </View>
    </View>
  )
}

// ─── Mockup renderers (palette-parameterised) ────────────────────────────────

interface MockupContext {
  name: string
  tagline: string
  palette: ColorPalette
  primarySwatchColor: string
  gradientStops: string[] | null
  isGradient: boolean
  tone: TonePreset | undefined
  domain: string
}

function renderLandingMockup(ctx: MockupContext): React.ReactElement {
  const { name, palette, primarySwatchColor, gradientStops, isGradient, tone, domain } = ctx
  const ctaText: string = tone?.copy.cta ?? 'Get Started'
  const NAV_LINKS: string[] = ['Features', 'Pricing', 'Blog']
  const FOOTER_LINKS: string[] = ['Terms', 'Privacy', 'Contact']
  const FEATURES: string[] = tone?.copy.featureTitles ?? ['Built for performance.', 'Security you can trust.', 'Scale without limits.']
  const FEATURE_DESCS: string[] = tone?.copy.featureDescriptions ?? [
    'Lightning-fast infrastructure that grows with your business.',
    'Enterprise-grade protection for your most sensitive data.',
    'From startup to enterprise, we scale seamlessly.',
  ]
  const FEATURE_ICONS: string[] = ['★', '◆', '⚡']

  return (
    <BrowserChrome url={`${domain}.com`} bg={palette.bg}>
      {/* Navbar */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: palette.border }}>
        <Text style={{ fontSize: 12, fontWeight: 700, color: palette.primary }}>{name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          {NAV_LINKS.map((link: string) => (
            <Text key={link} style={{ fontSize: 8, color: palette.textMuted }}>{link}</Text>
          ))}
          <PrimaryBox solid={primarySwatchColor} stops={gradientStops} isGradient={isGradient} width={70} height={22} borderRadius={6}>
            <Text style={{ fontSize: 8, fontWeight: 700, color: palette.onPrimary }}>{ctaText}</Text>
          </PrimaryBox>
        </View>
      </View>

      {/* Hero */}
      <View style={{ paddingHorizontal: 48, paddingVertical: 32, alignItems: 'center' }}>
        <Text style={{ fontSize: 22, fontWeight: 700, color: palette.text, textAlign: 'center', lineHeight: 1.25, maxWidth: 340 }}>
          {tone?.copy.heroHeadline ?? 'The smarter way to build.'}
        </Text>
        <Text style={{ fontSize: 9, color: palette.textMuted, textAlign: 'center', marginTop: 10, lineHeight: 1.5, maxWidth: 280 }}>
          {tone?.copy.heroSubheadline ?? "Trusted by teams who don't settle for second best."}
        </Text>
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
          <PrimaryBox solid={primarySwatchColor} stops={gradientStops} isGradient={isGradient} width={90} height={28} borderRadius={6}>
            <Text style={{ fontSize: 9, fontWeight: 700, color: palette.onPrimary }}>{ctaText}</Text>
          </PrimaryBox>
          <View style={{ paddingHorizontal: 10, paddingVertical: 7 }}>
            <Text style={{ fontSize: 9, fontWeight: 600, color: palette.secondary }}>Learn More →</Text>
          </View>
        </View>
      </View>

      {/* Features */}
      <View style={{ backgroundColor: palette.surface, borderTopWidth: 0.5, borderTopColor: palette.border, paddingHorizontal: 24, paddingVertical: 20 }}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {FEATURES.map((title: string, i: number) => (
            <View key={i} style={{ flex: 1, backgroundColor: palette.bg, borderWidth: 0.5, borderColor: palette.border, borderRadius: 8, padding: 12 }}>
              <View style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: `${palette.primary}20`, alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                <Text style={{ fontSize: 10, color: palette.primary }}>{FEATURE_ICONS[i] ?? '★'}</Text>
              </View>
              <Text style={{ fontSize: 8, fontWeight: 700, color: palette.text, marginBottom: 4 }}>{title}</Text>
              <Text style={{ fontSize: 7, color: palette.textMuted, lineHeight: 1.4 }}>{FEATURE_DESCS[i] ?? ''}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Footer */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 10, borderTopWidth: 0.5, borderTopColor: palette.border }}>
        <Text style={{ fontSize: 7, color: palette.textMuted }}>© 2026 {name}</Text>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {FOOTER_LINKS.map((link: string) => (
            <Text key={link} style={{ fontSize: 7, color: palette.textMuted }}>{link}</Text>
          ))}
        </View>
      </View>
    </BrowserChrome>
  )
}

function renderDashboardMockup(ctx: MockupContext): React.ReactElement {
  const { name, palette, primarySwatchColor, gradientStops, isGradient, tone, domain } = ctx
  const NAV_ITEMS: string[] = ['Dashboard', 'Projects', 'Analytics', 'Team', 'Settings']
  const STATS: { label: string; value: string }[] = [
    { label: 'Active Users', value: '2,847' },
    { label: 'Revenue', value: '$12.4k' },
    { label: 'Conversion', value: '3.2%' },
  ]
  const BAR_HEIGHTS: number[] = [40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 65]
  const ACTIVITY_ITEMS: string[] = ['New signup from alex@company.co', 'Invoice #1042 paid', 'Team meeting scheduled']
  const TIMESTAMPS: string[] = ['2m ago', '1h ago', '3h ago']

  return (
    <BrowserChrome url={`${domain}.com/dashboard`} bg={palette.bg}>
      <View style={{ flexDirection: 'row' }}>
        {/* Sidebar */}
        <View style={{ width: 120, backgroundColor: palette.surface, borderRightWidth: 0.5, borderRightColor: palette.border, padding: 12 }}>
          <Text style={{ fontSize: 10, fontWeight: 700, color: palette.primary, marginBottom: 12 }}>{name}</Text>
          {NAV_ITEMS.map((item: string, i: number) => (
            <View
              key={item}
              style={{ paddingVertical: 5, paddingHorizontal: 8, borderRadius: 5, marginBottom: 2, backgroundColor: i === 0 ? `${palette.primary}18` : 'transparent' }}
            >
              <Text style={{ fontSize: 8, color: i === 0 ? palette.primary : palette.textMuted }}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Main */}
        <View style={{ flex: 1, padding: 16 }}>
          <Text style={{ fontSize: 14, fontWeight: 700, color: palette.text }}>Dashboard</Text>
          <Text style={{ fontSize: 8, color: palette.textMuted, marginTop: 2, marginBottom: 14 }}>
            {tone?.copy.dashboardStatus ?? 'All systems operational'}
          </Text>

          {/* Stats */}
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
            {STATS.map((stat: { label: string; value: string }) => (
              <View key={stat.label} style={{ flex: 1, backgroundColor: palette.surface, borderWidth: 0.5, borderColor: palette.border, borderRadius: 6, padding: 10 }}>
                <Text style={{ fontSize: 14, fontWeight: 700, color: palette.primary }}>{stat.value}</Text>
                <Text style={{ fontSize: 7, color: palette.textMuted, marginTop: 2 }}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Chart */}
          <View style={{ backgroundColor: palette.surface, borderWidth: 0.5, borderColor: palette.border, borderRadius: 6, padding: 10, marginBottom: 12 }}>
            <Text style={{ fontSize: 8, fontWeight: 700, color: palette.text, marginBottom: 8 }}>Performance</Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 48, gap: 3 }}>
              {BAR_HEIGHTS.map((h: number, i: number) => (
                <View
                  key={i}
                  style={{ flex: 1, borderRadius: 2, backgroundColor: i === 6 ? primarySwatchColor : `${palette.primary}30`, height: `${h}%` as unknown as number }}
                />
              ))}
            </View>
          </View>

          {/* Activity */}
          <View style={{ backgroundColor: palette.surface, borderWidth: 0.5, borderColor: palette.border, borderRadius: 6 }}>
            <Text style={{ fontSize: 8, fontWeight: 700, color: palette.text, padding: 10, borderBottomWidth: 0.5, borderBottomColor: palette.border }}>
              Recent Activity
            </Text>
            {ACTIVITY_ITEMS.map((item: string, i: number) => (
              <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 7, borderBottomWidth: i < ACTIVITY_ITEMS.length - 1 ? 0.5 : 0, borderBottomColor: palette.border }}>
                <Text style={{ fontSize: 8, color: palette.text }}>{item}</Text>
                <Text style={{ fontSize: 7, color: palette.textMuted }}>{TIMESTAMPS[i]}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </BrowserChrome>
  )
}

function renderLoginMockup(ctx: MockupContext): React.ReactElement {
  const { name, tagline, palette, primarySwatchColor, gradientStops, isGradient, tone, domain } = ctx
  const SOCIAL_PROVIDERS: string[] = ['Google', 'GitHub']

  return (
    <BrowserChrome url={`${domain}.com/login`} bg={palette.bg}>
      <View style={{ alignItems: 'center', paddingVertical: 36, paddingHorizontal: 24 }}>
        {/* Brand */}
        <Text style={{ fontSize: 18, fontWeight: 700, color: palette.primary, marginBottom: 4 }}>{name}</Text>
        {tagline.length > 0 && (
          <Text style={{ fontSize: 9, color: palette.textMuted, marginBottom: 20 }}>{tagline}</Text>
        )}
        {tagline.length === 0 && <View style={{ marginBottom: 20 }} />}

        {/* Card */}
        <View style={{ width: 280, backgroundColor: palette.surface, borderWidth: 0.5, borderColor: palette.border, borderRadius: 12, padding: 24 }}>
          <Text style={{ fontSize: 13, fontWeight: 700, color: palette.text }}>{tone?.copy.loginWelcome ?? 'Welcome back.'}</Text>
          <Text style={{ fontSize: 8, color: palette.textMuted, marginTop: 2, marginBottom: 16 }}>Sign in to your account</Text>

          {/* Email */}
          <Text style={{ fontSize: 8, fontWeight: 600, color: palette.textMuted, marginBottom: 4 }}>Email</Text>
          <View style={{ height: 28, backgroundColor: palette.bg, borderWidth: 0.5, borderColor: palette.border, borderRadius: 6, justifyContent: 'center', paddingHorizontal: 10, marginBottom: 10 }}>
            <Text style={{ fontSize: 8, color: palette.textMuted }}>you@example.com</Text>
          </View>

          {/* Password */}
          <Text style={{ fontSize: 8, fontWeight: 600, color: palette.textMuted, marginBottom: 4 }}>Password</Text>
          <View style={{ height: 28, backgroundColor: palette.bg, borderWidth: 0.5, borderColor: palette.border, borderRadius: 6, justifyContent: 'center', paddingHorizontal: 10, marginBottom: 14 }}>
            <Text style={{ fontSize: 8, color: palette.textMuted }}>••••••••</Text>
          </View>

          {/* Sign in button */}
          <PrimaryBox solid={primarySwatchColor} stops={gradientStops} isGradient={isGradient} width={232} height={32} borderRadius={6} style={{ marginBottom: 14 }}>
            <Text style={{ fontSize: 9, fontWeight: 700, color: palette.onPrimary }}>Sign In</Text>
          </PrimaryBox>

          {/* Divider */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <View style={{ flex: 1, height: 0.5, backgroundColor: palette.border }} />
            <Text style={{ fontSize: 7, color: palette.textMuted }}>or continue with</Text>
            <View style={{ flex: 1, height: 0.5, backgroundColor: palette.border }} />
          </View>

          {/* Social buttons */}
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 14 }}>
            {SOCIAL_PROVIDERS.map((provider: string) => (
              <View key={provider} style={{ flex: 1, height: 28, backgroundColor: palette.bg, borderWidth: 0.5, borderColor: palette.border, borderRadius: 6, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 8, color: palette.text }}>{provider}</Text>
              </View>
            ))}
          </View>

          {/* Sign up link */}
          <Text style={{ fontSize: 7, color: palette.textMuted, textAlign: 'center' }}>
            {"Don't have an account? "}
            <Text style={{ color: palette.secondary, fontWeight: 700 }}>Sign up</Text>
          </Text>
        </View>
      </View>
    </BrowserChrome>
  )
}

function renderMobileMockup(ctx: MockupContext): React.ReactElement {
  const { name, palette, primarySwatchColor, gradientStops, isGradient, tone } = ctx
  const ctaText: string = tone?.copy.cta ?? 'Get Started'
  const MOBILE_STATS: { label: string; value: string; trend: string }[] = [
    { label: 'Tasks', value: '12', trend: '+3' },
    { label: 'Done', value: '7', trend: '+2' },
  ]
  const RECENT_ITEMS: string[] = ['Project Alpha', 'Design Review', 'Team Standup']
  const TIMES: string[] = ['2m', '1h', '3h']
  const TAB_ITEMS: string[] = ['Home', 'Stats', 'Add', 'Profile']

  return (
    <View style={[s.phoneOuter, { backgroundColor: palette.bg }]}>
      {/* Status bar */}
      <View style={[s.phoneStatusBar, { backgroundColor: palette.bg }]}>
        <Text style={{ fontSize: 7, fontWeight: 700, color: palette.text }}>9:41</Text>
        <Text style={{ fontSize: 7, color: palette.text }}>●●●● 🔋</Text>
      </View>

      {/* App header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 8, borderBottomWidth: 0.5, borderBottomColor: palette.border }}>
        <Text style={{ fontSize: 10, fontWeight: 700, color: palette.primary }}>{name}</Text>
        <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: palette.surface, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 8, color: palette.textMuted }}>⚙</Text>
        </View>
      </View>

      {/* Content */}
      <View style={{ paddingHorizontal: 14, paddingVertical: 10 }}>
        <Text style={{ fontSize: 12, fontWeight: 700, color: palette.text }}>{tone?.copy.mobileWelcome ?? 'Welcome back'}</Text>
        <Text style={{ fontSize: 7, color: palette.textMuted, marginTop: 2, marginBottom: 10 }}>
          {tone?.copy.dashboardStatus ?? 'Everything is running smoothly.'}
        </Text>

        {/* Stats */}
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 10 }}>
          {MOBILE_STATS.map((stat: { label: string; value: string; trend: string }) => (
            <View key={stat.label} style={{ flex: 1, backgroundColor: palette.surface, borderWidth: 0.5, borderColor: palette.border, borderRadius: 8, padding: 8 }}>
              <Text style={{ fontSize: 14, fontWeight: 700, color: palette.primary }}>{stat.value}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 }}>
                <Text style={{ fontSize: 6, color: palette.textMuted }}>{stat.label}</Text>
                <Text style={{ fontSize: 6, color: palette.success }}>{stat.trend}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* CTA */}
        <PrimaryBox solid={primarySwatchColor} stops={gradientStops} isGradient={isGradient} width={182} height={30} borderRadius={8} style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 8, fontWeight: 700, color: palette.onPrimary }}>{ctaText}</Text>
        </PrimaryBox>

        {/* Recent */}
        <Text style={{ fontSize: 7, fontWeight: 700, color: palette.textMuted, marginBottom: 5 }}>Recent</Text>
        {RECENT_ITEMS.map((item: string, i: number) => (
          <View key={item} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: i < RECENT_ITEMS.length - 1 ? 0.5 : 0, borderBottomColor: palette.border }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View style={{ width: 20, height: 20, borderRadius: 5, backgroundColor: `${palette.primary}18` }} />
              <View>
                <Text style={{ fontSize: 7, color: palette.text }}>{item}</Text>
                <Text style={{ fontSize: 6, color: palette.textMuted }}>Updated {TIMES[i]} ago</Text>
              </View>
            </View>
            <Text style={{ fontSize: 8, color: palette.textMuted }}>›</Text>
          </View>
        ))}
      </View>

      {/* Tab bar */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 10, paddingVertical: 7, backgroundColor: palette.surface, borderTopWidth: 0.5, borderTopColor: palette.border }}>
        {TAB_ITEMS.map((tab: string, i: number) => (
          <View key={tab} style={{ alignItems: 'center', gap: 2 }}>
            <View style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: i === 0 ? palette.primary : `${palette.textMuted}30` }} />
            <Text style={{ fontSize: 6, color: i === 0 ? palette.primary : palette.textMuted }}>{tab}</Text>
          </View>
        ))}
      </View>

      {/* Home bar */}
      <View style={[s.phoneHomeBar, { backgroundColor: palette.bg }]}>
        <View style={[s.phoneHomeIndicator, { backgroundColor: palette.border }]} />
      </View>
    </View>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function generatePDFDocument(state: BrandState): React.ReactElement<DocumentProps> {
  const {
    name, tagline, lightPalette, darkPalette, colorOverrides,
    headingFont, headingWeight, bodyFont, bodyWeight,
    tonePresetId, colorType, gradientCSS, gradientStops,
  } = state

  const palette: ColorPalette = { ...lightPalette, ...colorOverrides.light }
  const dark: ColorPalette = { ...darkPalette, ...colorOverrides.dark }
  const isGradient: boolean = colorType === 'gradient' && gradientCSS !== null
  const tone: TonePreset | undefined = tonePresetId !== null ? getTonePreset(tonePresetId) : undefined
  const dateLabel: string = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
  const dateShort: string = new Date().toLocaleDateString()
  const domain: string = domainFromName(name)

  const primarySwatchColor: string =
    isGradient && gradientStops !== null && gradientStops.length > 0
      ? (gradientStops[0] ?? palette.primary)
      : palette.primary

  const darkPrimarySwatchColor: string =
    isGradient && gradientStops !== null && gradientStops.length > 0
      ? (gradientStops[0] ?? dark.primary)
      : dark.primary

  const firstInitial: string = name.charAt(0).toUpperCase() || 'A'

  const lightCtx: MockupContext = { name, tagline, palette, primarySwatchColor, gradientStops: gradientStops, isGradient, tone, domain }
  const darkCtx: MockupContext = { name, tagline, palette: dark, primarySwatchColor: darkPrimarySwatchColor, gradientStops: gradientStops, isGradient, tone, domain }

  return (
    <Document>

      {/* ═══════════════════════════════════════════════════════
          PAGE 1 — BRAND GUIDE
      ═══════════════════════════════════════════════════════ */}
      <Page size="A4" style={[s.page, { backgroundColor: palette.bg, color: palette.text }]}>

        <View style={[s.header, { borderBottomColor: palette.border }]}>
          <Text style={[s.brandName, { color: palette.text }]}>{name}</Text>
          {tagline.length > 0 && <Text style={[s.tagline, { color: palette.textMuted }]}>{tagline}</Text>}
          <Text style={{ fontSize: 9, color: palette.textMuted, marginTop: 8 }}>Brand Guide v1.0 | {dateLabel}</Text>
        </View>

        {/* Wordmark */}
        <PdfSection title="Wordmark" palette={palette}>
          <View style={s.wordmarkGrid}>
            <View style={[s.wordmarkCard, { backgroundColor: lightPalette.bg, borderWidth: 0.5, borderColor: lightPalette.border }]}>
              <Text style={[s.wordmarkName, { color: lightPalette.text }]}>{name}</Text>
              <Text style={[s.wordmarkSub, { color: lightPalette.textMuted }]}>On Light</Text>
            </View>
            <View style={[s.wordmarkCard, { backgroundColor: dark.bg }]}>
              <Text style={[s.wordmarkName, { color: dark.text }]}>{name}</Text>
              <Text style={[s.wordmarkSub, { color: dark.textMuted }]}>On Dark</Text>
            </View>
            <PrimaryBox solid={primarySwatchColor} stops={gradientStops} isGradient={isGradient} width={240} height={76} borderRadius={8}>
              <View style={{ alignItems: 'center' }}>
                <Text style={[s.wordmarkName, { color: palette.onPrimary }]}>{name}</Text>
                <Text style={[s.wordmarkSub, { color: palette.onPrimary }]}>On Primary</Text>
              </View>
            </PrimaryBox>
            <View style={[s.wordmarkCard, { backgroundColor: lightPalette.bg, borderWidth: 0.5, borderColor: lightPalette.border }]}>
              <Text style={[s.wordmarkName, { color: palette.primary }]}>{name}</Text>
              <Text style={[s.wordmarkSub, { color: lightPalette.textMuted }]}>Brand Color</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <PrimaryBox solid={primarySwatchColor} stops={gradientStops} isGradient={isGradient} width={32} height={32} borderRadius={6}>
              <Text style={{ color: palette.onPrimary, fontSize: 14, fontWeight: 700 }}>{firstInitial}</Text>
            </PrimaryBox>
            <PrimaryBox solid={primarySwatchColor} stops={gradientStops} isGradient={isGradient} width={24} height={24} borderRadius={4}>
              <Text style={{ color: palette.onPrimary, fontSize: 10, fontWeight: 700 }}>{firstInitial}</Text>
            </PrimaryBox>
            <Text style={{ fontSize: 9, color: palette.textMuted }}>Favicon / Avatar</Text>
          </View>
        </PdfSection>

        {/* Brand Colors */}
        <PdfSection title="Brand Colors" palette={palette}>
          <PrimaryBox solid={primarySwatchColor} stops={gradientStops} isGradient={isGradient} width={499} height={60} borderRadius={8} style={{ alignItems: 'flex-start', justifyContent: 'flex-end' }}>
            <View style={{ padding: 12 }}>
              <Text style={{ fontSize: 10, fontWeight: 700, color: palette.onPrimary }}>Primary</Text>
              <Text style={{ fontSize: 8, marginTop: 2, color: palette.onPrimary }}>{isGradient ? 'Gradient' : palette.primary}</Text>
            </View>
          </PrimaryBox>
          {isGradient && gradientStops !== null && (
            <View style={s.gradientStopsRow}>
              {gradientStops.map((stop: string, i: number) => (
                <View key={i} style={[s.gradientStop, { backgroundColor: stop }]}>
                  <Text style={{ fontSize: 6, color: textOnSwatch(stop) }}>{stop}</Text>
                </View>
              ))}
            </View>
          )}
          <View style={s.brandColorRow}>
            {BRAND_COLORS.slice(1).map((role: ColorRole) => {
              const hex: string = palette[role.key]
              return (
                <View key={role.key} style={[s.brandColorCard, { borderColor: palette.border }]}>
                  <View style={[s.brandColorSwatch, { backgroundColor: hex }]}>
                    <Text style={{ fontSize: 7, color: textOnSwatch(hex) }}>{hex}</Text>
                  </View>
                  <View style={[s.brandColorInfo, { backgroundColor: palette.surface }]}>
                    <Text style={{ fontSize: 8, fontWeight: 700, color: palette.text }}>{role.label}</Text>
                    <Text style={{ fontSize: 7, color: palette.textMuted, marginTop: 2 }}>{role.desc}</Text>
                  </View>
                </View>
              )
            })}
          </View>
          <SectionLabel text="SURFACES & TEXT" palette={palette} />
          <View style={s.surfaceRow}>
            {SURFACE_TEXT_COLORS.map((role: ColorRole) => {
              const hex: string = palette[role.key]
              return (
                <View key={role.key} style={s.surfaceItem}>
                  <View style={[s.surfaceDot, { backgroundColor: hex, borderColor: palette.border }]} />
                  <View>
                    <Text style={{ fontSize: 8, fontWeight: 700, color: palette.text }}>{role.label}</Text>
                    <Text style={{ fontSize: 7, color: palette.textMuted }}>{hex}</Text>
                  </View>
                </View>
              )
            })}
          </View>
          <SectionLabel text="SEMANTIC" palette={palette} />
          <View style={s.semanticRow}>
            {SEMANTIC_COLORS.map((role: ColorRole) => {
              const hex: string = palette[role.key]
              return (
                <View key={role.key} style={s.semanticItem}>
                  <View style={[s.semanticDot, { backgroundColor: hex }]} />
                  <Text style={{ fontSize: 8, fontWeight: 700, color: palette.text }}>{role.label}</Text>
                  <Text style={{ fontSize: 7, color: palette.textMuted, marginLeft: 4 }}>{hex}</Text>
                </View>
              )
            })}
          </View>
        </PdfSection>

        {/* Typography */}
        <PdfSection title="Typography" palette={palette}>
          <View style={[s.typographyCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
            <View style={s.typographyMeta}>
              <Text style={[s.typographyMetaLabel, { color: palette.textMuted }]}>Heading</Text>
              <Text style={[s.typographyMetaDetail, { color: palette.textMuted }]}>{headingFont} · {headingWeight} · 32–48px</Text>
            </View>
            <Text style={{ fontSize: 22, fontWeight: 700, color: palette.text, lineHeight: 1.2 }}>
              {tone?.copy.heroHeadline ?? 'The smarter way to build.'}
            </Text>
          </View>
          <View style={[s.typographyCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
            <View style={s.typographyMeta}>
              <Text style={[s.typographyMetaLabel, { color: palette.textMuted }]}>Subheading</Text>
              <Text style={[s.typographyMetaDetail, { color: palette.textMuted }]}>{headingFont} · {Math.min(headingWeight, 600)} · 20–24px</Text>
            </View>
            <Text style={{ fontSize: 15, fontWeight: 600, color: palette.text, lineHeight: 1.3 }}>
              {tone?.copy.heroSubheadline ?? "Trusted by teams who don't settle for second best."}
            </Text>
          </View>
          <View style={[s.typographyCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
            <View style={s.typographyMeta}>
              <Text style={[s.typographyMetaLabel, { color: palette.textMuted }]}>Body</Text>
              <Text style={[s.typographyMetaDetail, { color: palette.textMuted }]}>{bodyFont} · {bodyWeight} · 16px</Text>
            </View>
            <Text style={{ fontSize: 10, color: palette.text, lineHeight: 1.6 }}>
              This is body text at regular weight and size, showing how paragraphs look in production across multiple lines of content.
            </Text>
          </View>
          <View style={[s.typographyCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
            <View style={s.typographyMeta}>
              <Text style={[s.typographyMetaLabel, { color: palette.textMuted }]}>Caption</Text>
              <Text style={[s.typographyMetaDetail, { color: palette.textMuted }]}>{bodyFont} · {bodyWeight} · 12–13px</Text>
            </View>
            <Text style={{ fontSize: 8, color: palette.textMuted, lineHeight: 1.5 }}>
              Captions and helper text for labels, timestamps, metadata, and secondary information.
            </Text>
          </View>
          <SectionLabel text="WEIGHT SPECIMENS" palette={palette} />
          <View style={s.weightRow}>
            {WEIGHT_SHOWCASE.map((w: number) => (
              <View key={w} style={s.weightItem}>
                <Text style={{ fontSize: 24, fontWeight: w >= 600 ? 700 : 400, color: palette.text }}>Aa</Text>
                <Text style={{ fontSize: 8, color: palette.textMuted, marginTop: 2 }}>{w}</Text>
              </View>
            ))}
          </View>
        </PdfSection>

        {/* Buttons */}
        <PdfSection title="Buttons" palette={palette}>
          <SectionLabel text="ON LIGHT" palette={palette} />
          <View style={[s.buttonSurface, { backgroundColor: lightPalette.bg, borderColor: lightPalette.border }]}>
            <PrimaryBox solid={primarySwatchColor} stops={gradientStops} isGradient={isGradient} width={72} height={28} borderRadius={6}>
              <Text style={{ color: palette.onPrimary, fontSize: 9, fontWeight: 700 }}>Primary</Text>
            </PrimaryBox>
            <View style={[s.btn, { backgroundColor: palette.secondary }]}>
              <Text style={{ color: palette.onSecondary, fontSize: 9, fontWeight: 700 }}>Secondary</Text>
            </View>
            <View style={[s.btn, { borderWidth: 1.5, borderColor: palette.primary }]}>
              <Text style={{ color: palette.primary, fontSize: 9, fontWeight: 700 }}>Outline</Text>
            </View>
            <View style={s.btn}>
              <Text style={{ color: palette.primary, fontSize: 9, fontWeight: 700 }}>Ghost</Text>
            </View>
          </View>
          <SectionLabel text="ON DARK" palette={palette} />
          <View style={[s.buttonSurface, { backgroundColor: dark.bg, borderColor: dark.border }]}>
            <PrimaryBox solid={darkPrimarySwatchColor} stops={gradientStops} isGradient={isGradient} width={72} height={28} borderRadius={6}>
              <Text style={{ color: dark.onPrimary, fontSize: 9, fontWeight: 700 }}>Primary</Text>
            </PrimaryBox>
            <View style={[s.btn, { backgroundColor: dark.secondary }]}>
              <Text style={{ color: dark.onSecondary, fontSize: 9, fontWeight: 700 }}>Secondary</Text>
            </View>
            <View style={[s.btn, { borderWidth: 1.5, borderColor: dark.primary }]}>
              <Text style={{ color: dark.primary, fontSize: 9, fontWeight: 700 }}>Outline</Text>
            </View>
            <View style={s.btn}>
              <Text style={{ color: dark.primary, fontSize: 9, fontWeight: 700 }}>Ghost</Text>
            </View>
          </View>
        </PdfSection>

        {/* Voice & Tone */}
        {tone !== undefined && (
          <PdfSection title="Voice & Tone" palette={palette}>
            {tone.voiceExamples.map((example: { do: string; dont: string }, i: number) => (
              <View key={i} style={[s.voiceRow, { marginBottom: i < tone.voiceExamples.length - 1 ? 8 : 0 }]}>
                <View style={[s.voiceCard, { backgroundColor: palette.surface, borderLeftColor: palette.success }]}>
                  <Text style={{ fontSize: 8, fontWeight: 700, color: palette.success, marginBottom: 4 }}>Do</Text>
                  <Text style={{ fontSize: 9, color: palette.text }}>{example.do}</Text>
                </View>
                <View style={[s.voiceCard, { backgroundColor: palette.surface, borderLeftColor: palette.error }]}>
                  <Text style={{ fontSize: 8, fontWeight: 700, color: palette.error, marginBottom: 4 }}>{"Don't"}</Text>
                  <Text style={{ fontSize: 9, color: palette.text }}>{example.dont}</Text>
                </View>
              </View>
            ))}
            <View style={{ marginTop: 12, borderWidth: 0.5, borderColor: palette.border, borderRadius: 6 }}>
              <View style={{ flexDirection: 'row', backgroundColor: palette.surface, paddingVertical: 6, paddingHorizontal: 8 }}>
                <Text style={{ flex: 1, fontSize: 8, fontWeight: 700, color: palette.textMuted }}>Context</Text>
                <Text style={{ flex: 1, fontSize: 8, fontWeight: 700, color: palette.textMuted }}>Tone</Text>
                <Text style={{ flex: 2, fontSize: 8, fontWeight: 700, color: palette.textMuted }}>Example</Text>
              </View>
              {tone.toneTable.map((row: { context: string; tone: string; example: string }, i: number) => (
                <View key={i} style={[s.toneTableRow, { borderTopColor: palette.border }]}>
                  <Text style={{ flex: 1, fontSize: 8, color: palette.text }}>{row.context}</Text>
                  <Text style={{ flex: 1, fontSize: 8, color: palette.textMuted }}>{row.tone}</Text>
                  <Text style={{ flex: 2, fontSize: 8, color: palette.textMuted }}>{row.example}</Text>
                </View>
              ))}
            </View>
          </PdfSection>
        )}

        {/* Brand Identity */}
        {tone !== undefined && (
          <PdfSection title="Brand Identity" palette={palette}>
            <View style={s.traitRow}>
              {tone.traits.map((trait: string, i: number) => (
                <View key={trait} style={[s.traitCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
                  <Text style={{ fontSize: 13, fontWeight: 700, color: palette.primary, marginBottom: 4, textAlign: 'center' }}>{trait}</Text>
                  <Text style={{ fontSize: 8, color: palette.textMuted, textAlign: 'center', lineHeight: 1.4 }}>{tone.traitDescriptions[i]}</Text>
                </View>
              ))}
            </View>
          </PdfSection>
        )}

        <Text style={[s.footer, { color: palette.textMuted }]}>Generated by brandstylegenerator.com | {dateShort}</Text>
      </Page>

      {/* ═══════════════════════════════════════════════════════
          PAGE 2 — LANDING (Light)
      ═══════════════════════════════════════════════════════ */}
      <Page size="A4" style={[s.mockupPage, { backgroundColor: '#FFFFFF', justifyContent: 'center' }]}>
        <View style={s.mockupPageHeader}>
          <Text style={[s.mockupPageBrand, { color: '#111111' }]}>{name}</Text>
          <Text style={s.mockupPageLabel}>Landing Page — Light</Text>
        </View>
        {renderLandingMockup(lightCtx)}
        <Text style={[s.footer, { color: '#9CA3AF', left: 24, right: 24 }]}>Generated by brandstylegenerator.com | {dateShort}</Text>
      </Page>

      {/* ═══════════════════════════════════════════════════════
          PAGE 3 — LANDING (Dark)
      ═══════════════════════════════════════════════════════ */}
      <Page size="A4" style={[s.mockupPage, { backgroundColor: '#FFFFFF', justifyContent: 'center' }]}>
        <View style={s.mockupPageHeader}>
          <Text style={[s.mockupPageBrand, { color: '#111111' }]}>{name}</Text>
          <Text style={s.mockupPageLabel}>Landing Page — Dark</Text>
        </View>
        {renderLandingMockup(darkCtx)}
        <Text style={[s.footer, { color: '#9CA3AF', left: 24, right: 24 }]}>Generated by brandstylegenerator.com | {dateShort}</Text>
      </Page>

      {/* ═══════════════════════════════════════════════════════
          PAGE 4 — DASHBOARD (Light)
      ═══════════════════════════════════════════════════════ */}
      <Page size="A4" style={[s.mockupPage, { backgroundColor: '#FFFFFF', justifyContent: 'center' }]}>
        <View style={s.mockupPageHeader}>
          <Text style={[s.mockupPageBrand, { color: '#111111' }]}>{name}</Text>
          <Text style={s.mockupPageLabel}>Dashboard — Light</Text>
        </View>
        {renderDashboardMockup(lightCtx)}
        <Text style={[s.footer, { color: '#9CA3AF', left: 24, right: 24 }]}>Generated by brandstylegenerator.com | {dateShort}</Text>
      </Page>

      {/* ═══════════════════════════════════════════════════════
          PAGE 5 — DASHBOARD (Dark)
      ═══════════════════════════════════════════════════════ */}
      <Page size="A4" style={[s.mockupPage, { backgroundColor: '#FFFFFF', justifyContent: 'center' }]}>
        <View style={s.mockupPageHeader}>
          <Text style={[s.mockupPageBrand, { color: '#111111' }]}>{name}</Text>
          <Text style={s.mockupPageLabel}>Dashboard — Dark</Text>
        </View>
        {renderDashboardMockup(darkCtx)}
        <Text style={[s.footer, { color: '#9CA3AF', left: 24, right: 24 }]}>Generated by brandstylegenerator.com | {dateShort}</Text>
      </Page>

      {/* ═══════════════════════════════════════════════════════
          PAGE 6 — LOGIN (Light)
      ═══════════════════════════════════════════════════════ */}
      <Page size="A4" style={[s.mockupPage, { backgroundColor: '#FFFFFF', justifyContent: 'center' }]}>
        <View style={s.mockupPageHeader}>
          <Text style={[s.mockupPageBrand, { color: '#111111' }]}>{name}</Text>
          <Text style={s.mockupPageLabel}>Login Page — Light</Text>
        </View>
        {renderLoginMockup(lightCtx)}
        <Text style={[s.footer, { color: '#9CA3AF', left: 24, right: 24 }]}>Generated by brandstylegenerator.com | {dateShort}</Text>
      </Page>

      {/* ═══════════════════════════════════════════════════════
          PAGE 7 — LOGIN (Dark)
      ═══════════════════════════════════════════════════════ */}
      <Page size="A4" style={[s.mockupPage, { backgroundColor: '#FFFFFF', justifyContent: 'center' }]}>
        <View style={s.mockupPageHeader}>
          <Text style={[s.mockupPageBrand, { color: '#111111' }]}>{name}</Text>
          <Text style={s.mockupPageLabel}>Login Page — Dark</Text>
        </View>
        {renderLoginMockup(darkCtx)}
        <Text style={[s.footer, { color: '#9CA3AF', left: 24, right: 24 }]}>Generated by brandstylegenerator.com | {dateShort}</Text>
      </Page>

      {/* ═══════════════════════════════════════════════════════
          PAGE 8 — MOBILE (Light + Dark side by side)
      ═══════════════════════════════════════════════════════ */}
      <Page size="A4" style={[s.mockupPage, { backgroundColor: '#FFFFFF', justifyContent: 'center' }]}>
        <View style={s.mockupPageHeader}>
          <Text style={[s.mockupPageBrand, { color: '#111111' }]}>{name}</Text>
          <Text style={s.mockupPageLabel}>Mobile App</Text>
        </View>
        <View style={[s.mockupPairRow, { justifyContent: 'center', gap: 32 }]}>
          <View style={{ alignItems: 'center' }}>
            <Text style={[s.mockupModeLabel, { textAlign: 'center' }]}>LIGHT</Text>
            {renderMobileMockup(lightCtx)}
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={[s.mockupModeLabel, { textAlign: 'center' }]}>DARK</Text>
            {renderMobileMockup(darkCtx)}
          </View>
        </View>
        <Text style={[s.footer, { color: '#9CA3AF', left: 24, right: 24 }]}>Generated by brandstylegenerator.com | {dateShort}</Text>
      </Page>

    </Document>
  )
}
