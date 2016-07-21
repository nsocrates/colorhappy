import { round } from './helpers'
import { validateHex } from './hex'

function calcHue([r, g, b]) {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let hue = 0

  if (max === min) {
    hue = 0
  } else if (max === r) {
    hue = ((g - b) / (max - min)) * 60
  } else if (max === g) {
    hue = (2 + (b - r) / (max - min)) * 60
  } else {
    hue = (4 + (r - g) / (max - min)) * 60
  }

  if (hue < 0) hue = hue + 360

  return hue
}

const calcSaturation = (min, max) => lum => {
  let saturation
  if (max === min) saturation = 0
  else if (lum <= 0.5) saturation = (max - min) / (max + min)
  else saturation = (max - min) / (2 - max - min)

  return saturation
}

const calcLuminace = (min, max) => (max + min) / 2

export function toHsl(rgb) {
  const values = rgb.map(value => value / 255)
  const [r, g, b] = values

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  const h = calcHue(values)
  const l = calcLuminace(min, max)
  const s = calcSaturation(min, max)(l)

  return [h, s, l]
}

export const toHex = rgb => (
  validateHex(
    round(rgb).map(value => {
      const hex = value.toString(16)
      return hex.length === 1 ? `0${hex}` : hex
    }).join('')
  )
)
