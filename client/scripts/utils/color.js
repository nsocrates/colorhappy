function validateHex(hex) {
  const ret = String(hex).replace(/[^0-9a-f]/gi, '')
  return ret.length === '3'
    ? `${ret[0]}${ret[0]}${ret[1]}${ret[1]}${ret[2]}${ret[2]}`
    : ret
}

export function contrast(hexColor) {
  const hex = validateHex(hexColor)
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return (yiq >= 128) ? '#000' : '#fff';
}
