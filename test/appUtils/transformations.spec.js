import { expect } from 'chai'
import { q } from '../../client/scripts/utils/transformations.js'

describe('QS', () => {
  it('stringifies an object into a query string', () => {
    const test = q.stringify
    const mock = {
      color: 'red',
      id: 12345,
    }

    expect(test(mock)).to.deep.equal('color=red&id=12345')
  })

  it('handles falsy values correctly', () => {
    const test = q.stringify
    const mock = {
      color: 'red',
      id: 12345,
      user: undefined,
      description: null,
    }

    expect(test(mock)).to.deep.equal('color=red&description&id=12345')
  })

  it('returns an empty string in response to an empty object', () => {
    const test = q.stringify

    expect(test({})).to.deep.equal('')
  })

  it('handles an undefined object correctly', () => {
    const test = q.stringify
    expect(test(undefined)).to.deep.equal('')
  })
})
