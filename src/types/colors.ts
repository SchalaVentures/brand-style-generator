export interface ColorShade {
  id: string
  name: string
  hex: string
}

/** A solid color family - user picks a family, then a shade within it */
export interface ColorFamily {
  id: string
  name: string
  type: 'solid'
  icon: string
  representative: string
  shades: ColorShade[]
}

/** A gradient stop - one color in a multi-color gradient */
export interface GradientStop {
  hex: string
  position?: number
}

/** A gradient color family - the accent IS the gradient, palette derives from the primary stop */
export interface GradientFamily {
  id: string
  name: string
  type: 'gradient'
  description: string
  ref: string
  stops: GradientStop[]
  gradientCSS: string
  primaryStop: string
  representative: string
}

/** Union type - a color option is either a solid family or a gradient family */
export type ColorOption = ColorFamily | GradientFamily

/** Type guard */
export function isGradientFamily(option: ColorOption): option is GradientFamily {
  return option.type === 'gradient'
}
