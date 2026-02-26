import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

// ─── Brand tokens ────────────────────────────────────────────────────────────

const BRAND = {
  name: 'Brand Style Generator',
  url: 'https://brandstylegenerator.com',
  black: '#111111',
  white: '#FFFFFF',
  bg: '#F7F7F5',
  cardBg: '#FFFFFF',
  border: '#E5E7EB',
  text: '#111111',
  textBody: '#4B5563',
  textMuted: '#9CA3AF',
  accent: '#111111',
} as const;

// ─── Shared styles ───────────────────────────────────────────────────────────

export const styles = {
  main: {
    backgroundColor: BRAND.bg,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
    WebkitFontSmoothing: 'antialiased' as const,
  },

  outerPadding: {
    padding: '40px 20px',
  },

  card: {
    maxWidth: '480px',
    backgroundColor: BRAND.cardBg,
    borderRadius: '12px',
    overflow: 'hidden' as const,
  },

  accentBar: {
    height: '3px',
    backgroundColor: BRAND.accent,
    fontSize: '0px',
    lineHeight: '0px',
  },

  content: {
    padding: '40px 36px 36px',
  },

  wordmark: {
    margin: '0 0 32px',
    fontSize: '13px',
    fontWeight: 700,
    letterSpacing: '-0.3px',
    color: BRAND.black,
  },

  heading: {
    margin: '0 0 12px',
    fontSize: '22px',
    fontWeight: 700,
    letterSpacing: '-0.5px',
    lineHeight: '1.25',
    color: BRAND.text,
  },

  paragraph: {
    margin: '0 0 28px',
    fontSize: '15px',
    lineHeight: '1.6',
    color: BRAND.textBody,
  },

  button: {
    display: 'inline-block' as const,
    padding: '13px 32px',
    fontSize: '14px',
    fontWeight: 600,
    color: BRAND.white,
    backgroundColor: BRAND.accent,
    borderRadius: '8px',
    textDecoration: 'none',
    letterSpacing: '-0.1px',
    lineHeight: '1',
  },

  buttonContainer: {
    margin: '0 0 28px',
  },

  muted: {
    margin: '0',
    fontSize: '13px',
    lineHeight: '1.5',
    color: BRAND.textMuted,
  },

  footerWrapper: {
    padding: '0 36px 32px',
  },

  footerDivider: {
    borderTop: `1px solid ${BRAND.border}`,
    paddingTop: '20px',
  },

  footerLink: {
    color: BRAND.textMuted,
    textDecoration: 'none',
    fontSize: '12px',
  },

  codeBlock: {
    margin: '0 0 28px',
    padding: '16px 20px',
    backgroundColor: '#F3F4F6',
    borderRadius: '8px',
    fontSize: '28px',
    fontWeight: 700,
    letterSpacing: '4px',
    textAlign: 'center' as const,
    color: BRAND.black,
    fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace",
  },
} as const;

// ─── Layout component ────────────────────────────────────────────────────────

interface EmailLayoutProps {
  preview: string;
  children: React.ReactNode;
}

export function EmailLayout({ preview, children }: EmailLayoutProps) {
  return (
    <Html dir="ltr" lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={styles.main}>
        <Container style={styles.outerPadding}>
          <Container style={styles.card}>
            {/* Top accent bar */}
            <Section>
              <tr>
                <td style={styles.accentBar}>&nbsp;</td>
              </tr>
            </Section>

            {/* Content */}
            <Section style={styles.content}>
              <Text style={styles.wordmark}>Brand Style Generator</Text>
              {children}
            </Section>

            {/* Footer */}
            <Section style={styles.footerWrapper}>
              <table
                width="100%"
                border={0}
                cellPadding={0}
                cellSpacing={0}
                role="presentation"
              >
                <tr>
                  <td style={styles.footerDivider}>
                    <Text style={{ margin: 0, fontSize: '12px', color: '#9CA3AF', lineHeight: '1.5' }}>
                      <Link href={BRAND.url} style={styles.footerLink}>
                        brandstylegenerator.com
                      </Link>
                    </Text>
                  </td>
                </tr>
              </table>
            </Section>
          </Container>
        </Container>
      </Body>
    </Html>
  );
}
