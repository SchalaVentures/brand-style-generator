export interface FontSpec {
  family: string
  weight: number
  googleFontsId?: string
}

export interface FontPair {
  id: string
  heading: FontSpec
  body: FontSpec
}

export interface FontCategory {
  id: string
  name: string
  description: string
  vibe: string
  pairs: FontPair[]
}
