export interface ToneCopy {
  heroHeadline: string
  heroSubheadline: string
  cta: string
  featureTitles: [string, string, string]
  featureDescriptions: [string, string, string]
  dashboardStatus: string
  loginWelcome: string
  testimonialQuote: string
  mobileWelcome: string
  mobileCardTitle: string
}

export interface ToneVoiceExample {
  do: string
  dont: string
}

export interface TonePreset {
  id: string
  name: string
  description: string
  thinkReferences: string
  copy: ToneCopy
  voiceExamples: [ToneVoiceExample, ToneVoiceExample, ToneVoiceExample]
  toneTable: {
    context: string
    tone: string
    example: string
  }[]
  traits: [string, string, string]
  traitDescriptions: [string, string, string]
}
