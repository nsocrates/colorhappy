import { expect } from 'chai'
import { hex, rgb, hsl, round as r } from '../../client/scripts/utils/color'

describe('Color Utilities', () => {
  it('converts hex to rgb', () => {
    const test = hex.toRgb
    expect(test('79a6e2')).to.deep.equal([121, 166, 226])
    expect(test('#a4ab0e')).to.deep.equal([164, 171, 14])
    expect(test('#c692c0')).to.deep.equal([198, 146, 192])
  })

  it('converts rgb to hsl', () => {
    const test = rgb.toHsl
    expect(r(test([164, 171, 14]))).to.deep.equal([63, 0.85, 0.36])
    expect(r(test([24, 98, 118]))).to.deep.equal([193, 0.66, 0.28])
    expect(r(test([198, 146, 192]))).to.deep.equal([307, 0.31, 0.67])
  })

  it('converts hsl to rgb', () => {
    const test = hsl.toRgb
    expect(r(test([0, 0, 0.81]))).to.deep.equal([207, 207, 207])
    expect(r(test([193, 0.66, 0.28]))).to.deep.equal([24, 98, 119])
  })

  it('is consistent when converting hsl to hex', () => {
    const test = hsl.toHex
    const toRgb = hsl.toRgb
    const toHex = rgb.toHex
    expect(r(toRgb([211, 0.64, 0.40]))).to.deep.equal([37, 100, 167])
    expect(toHex([37, 100, 167])).to.deep.equal('2564a7')
    expect(test([211, 0.64, 0.40])).to.deep.equal('2564a7')
  })
})
