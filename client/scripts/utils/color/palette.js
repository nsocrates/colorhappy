import * as hex from './hex'
import * as hsl from './hsl'

export function generatePalette(initHex, colors = 5, offset = 40) {
  const hslPalette = []
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
