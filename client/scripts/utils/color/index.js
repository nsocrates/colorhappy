import * as _rgb from './rgb'
import * as _hsl from './hsl'
import * as _hex from './hex'

export const hex = _hex
export const rgb = _rgb
export const hsl = _hsl

export function generatePalette(initHex, number) {
  const hslPalette = []
  const colors = number || 5
  const offset = 360 / colors
  const randomHex = hex.random()
  const [h, s, l] = initHex ? hex.toHsl(initHex) : hex.toHsl(randomHex)
  let startValue = h - (offset * 3)

  while (startValue < 0) startValue += 360
  for (let i = 1; i <= colors; i++) {
    let value = startValue + (offset * i)
    while (value > 360) value -= 360
    hslPalette.push([value, s, l])
  }
  return hslPalette.map(color => hsl.toHex(color))
}
