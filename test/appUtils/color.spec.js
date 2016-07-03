import { expect } from 'chai'
import { hex, rgb, hsl } from '../../client/scripts/utils/color'

describe('Color Utilities', () => {
  it('converts hex to rgb', () => {
    const test = hex.toRgb
    expect(test('79a6e2')).to.deep.equal([121, 166, 226])
    expect(test('#a4ab0e')).to.deep.equal([164, 171, 14])
    expect(test('#c692c0')).to.deep.equal([198, 146, 192])
  })

  it('converts rgb to hsl', () => {
    const test = rgb.toHsl
    expect(test([164, 171, 14])).to.deep.equal([63, 0.85, 0.36])
    expect(test([24, 98, 118])).to.deep.equal([193, 0.66, 0.28])
    expect(test([198, 146, 192])).to.deep.equal([307, 0.31, 0.67])
  })

  it('converts hsl to rgb', () => {
    const test = hsl.toRgb
    expect(test([0, 0, 0.81])).to.deep.equal([207, 207, 207])
    expect(test([193, 0.66, 0.28])).to.deep.equal([24, 98, 119])
  })

  it('converts hsl to hex', () => {
    // const test = hsl.toHex
    // const toRgb = hsl.toRgb
    // const toHex = rgb.toHex
    // expect(toRgb([63, 0.85, 0.36])).to.deep.equal([162, 170, 14])
    // expect(toHex([164, 171, 14])).to.deep.equal('a4ab0e')
    // expect(test([63, 0.85, 0.36])).to.deep.equal('a4ab0e')
  })
})
