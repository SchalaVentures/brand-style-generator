declare module 'culori' {
  export interface Oklch {
    mode: 'oklch'
    l: number
    c: number
    h?: number
    alpha?: number
  }

  export interface Rgb {
    mode: 'rgb'
    r: number
    g: number
    b: number
    alpha?: number
  }

  export type Color = Oklch | Rgb | Record<string, unknown>

  export function converter(mode: string): (color: string | Color) => Oklch | undefined
  export function formatHex(color: Color | Oklch): string | undefined
}
