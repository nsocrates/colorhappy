export const round = numbers =>
  numbers.map(number => {
    if (number >= 1) return Math.round(number)
    return Math.round(number * 100) / 100
  })
