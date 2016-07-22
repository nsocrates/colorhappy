import { toHsl as rgbToHsl } from './rgb'
import { validateHex } from './helpers'

export function random() {
  // http://stackoverflow.com/questions/5092808/how-do-i-randomly-generate-html-hex-color-codes-using-javascript
  const randomHex = '#000000'.replace(/0/g, () => (~~(Math.random() * 16)).toString(16))
  return validateHex(randomHex) || random()

  // Radix of 16 converts number to hexadecimal string
  // const randomHex = Math.random().toString(16).substring(2, 8)
  // return validateHex(randomHex) || random()
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
