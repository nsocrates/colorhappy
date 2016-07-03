import { expect } from 'chai'
import { hexToRgb, rgbToHsl } from '../../client/scripts/utils/color'

describe('Color Utilities', () => {
  it('converts hex to rgb', () => {
    const test = hexToRgb
    expect(test('#fff')).to.deep.equal([255, 255, 255])
    expect(test('79a6e2')).to.deep.equal([121, 166, 226])
    expect(test('48bf4e')).to.deep.equal([72, 191, 78])
  })

  it('converts rgb to hsl', () => {
    const test = rgbToHsl
    expect(test([72, 91, 78])).to.deep.equal([139, 0.12, 0.32])
    expect(test([24, 98, 118])).to.deep.equal([193, 0.66, 0.28])
    expect(test([255, 255, 255])).to.deep.equal([0, 0, 1])
  })
})
