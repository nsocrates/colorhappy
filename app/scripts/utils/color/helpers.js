export const round = numbers =>
  numbers.map(number => {
    if (number >= 1) return Math.round(number)
    return Math.round(number * 100) / 100
  })

export function validateHex(hex) {
  const ret = String(hex).replace(/[^0-9a-f]/gi, '').toUpperCase()

  if (ret.length !== 3 && ret.length !== 6) {
    console.warn(`Invalid hex: ${hex}`)
    return false
  }

  return ret.length === 3
    ? (`${ret[0]}${ret[0]}${ret[1]}${ret[1]}${ret[2]}${ret[2]}`)
    : ret
}
