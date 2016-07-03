import { toHex as rgbToHex } from './rgb'

function getHues(hue) {
  const h = hue / 360
  const hues = [h + 1 / 3, h, h - 1 / 3]
  return hues.map(value => {
    if (value < 0) return value + 1
    if (value > 1) return value - 1
    return value
  })
}

const hueToRgb = (m1, m2) => h => {
  let hue

  if (6 * h < 1) {
    hue = m2 + (m1 - m2) * h * 6
  } else if (h * 2 < 1) {
    hue = m1
  } else if (h * 3 < 2) {
    hue = m2 + (m1 - m2) * (2 / 3 - h) * 6
  } else {
    hue = m2
  }

  return Math.round(hue * 255)
}

export function toRgb(hsl) {
  const [h, s, l] = hsl
  if (s === 0) {
    const gray = Math.round(l * 255)
    return [gray, gray, gray]
  }

  const m1 = l <= 0.5
    ? l * (s + 1)
    : l + s - l * s

  const m2 = 2 * l - m1

  const [rHue, gHue, bHue] = getHues(h)
  const r = hueToRgb(m1, m2)(rHue)
  const g = hueToRgb(m1, m2)(gHue)
  const b = hueToRgb(m1, m2)(bHue)

  return [r, g, b]
}

export const toHex = hsl => rgbToHex(toRgb(hsl))
