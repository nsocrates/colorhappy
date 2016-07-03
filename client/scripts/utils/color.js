function validateHex(hex) {
  const ret = String(hex).replace(/[^0-9a-f]/gi, '')
  if (ret.length !== 3 && ret.length !== 6) return false
  return ret.length === 3
    ? `${ret[0]}${ret[0]}${ret[1]}${ret[1]}${ret[2]}${ret[2]}`
    : ret
}

const everyTwo = str => str.match(/.{2}|.{1,2}/g)

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

  if (hue < 0) hue = hue * 360

  return Math.round(hue)
}

const calcSaturation = (min, max) => lum => {
  let saturation
  if (max === min) saturation = 0
  else if (lum <= 0.5) saturation = (max - min) / (max + min)
  else saturation = (max - min) / (2 - max - min)

  return Math.round(saturation * 100) / 100
}

const calcLuminace = (min, max) => Math.round(((max + min) / 2) * 100) / 100

export function generateRandomHex() {
  // Radix of 16 converts number to hexadecimal string
  const randomHex = Math.random().toString(16).substring(2, 8)
  return validateHex(randomHex) ? randomHex : generateRandomHex()
}

export function hexToRgb(hex) {
  // Reverse back to number with parseInt
  return everyTwo(validateHex(hex)).map(rgb => parseInt(rgb, 16))
}

export function contrastHex(hexColor) {
  const hex = validateHex(hexColor)
  const [r, g, b] = hexToRgb(hex)
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return (yiq >= 128) ? '#000' : '#fff';
}

export function rgbToHsl(rgb) {
  const values = rgb.map(value => value / 255)
  const [r, g, b] = values

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  const h = calcHue(values)
  const l = calcLuminace(min, max)
  const s = calcSaturation(min, max)(l)

  return [h, s, l]
}

export function hslToRgb(hsl) {
  const [h, s, l] = hsl
  if (s === 0) {
    return [l * 255, l * 255, l * 255]
  }
  return 'TODO'
}
