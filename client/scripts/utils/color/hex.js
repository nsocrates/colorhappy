import { toHsl as rgbToHsl } from './rgb'

function validateHex(hex) {
  const ret = String(hex).replace(/[^0-9a-f]/gi, '')
  if (ret.length !== 3 && ret.length !== 6) throw new Error(`Invalid hex: ${hex}`)
  return ret.length === 3
    ? `${ret[0]}${ret[0]}${ret[1]}${ret[1]}${ret[2]}${ret[2]}`
    : ret
}

export function random() {
  // Radix of 16 converts number to hexadecimal string
  const randomHex = Math.random().toString(16).substring(2, 8)
  return validateHex(randomHex) || random()
}

export function toRgb(hex) {
  // 1. Group hexcode by 2s
  const validatedChunks = validateHex(hex).match(/.{2}|.{1,2}/g)
  // 2. Base 16 converts hexidecimal to numbers
  return validatedChunks.map(rgb => parseInt(rgb, 16))
}

export function contrast(hexColor) {
  const hex = validateHex(hexColor)
  const [r, g, b] = toRgb(hex)
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return (yiq >= 128) ? '#000' : '#fff';
}

export const toHsl = hex => rgbToHsl(toRgb(validateHex(hex)))
