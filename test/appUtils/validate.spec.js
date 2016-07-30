import { expect } from 'chai'
import { validateUserSignup } from '../../client/scripts/redux/services/validation'

describe('Validations', () => {
  it('works', () => {
    const mock = {
      username: 'foo',
      email: 'foo@mail.com',
      password: 'foo',
    }
    return validateUserSignup(mock)
      .then(data => expect(data).to.have.property('username'))
  })
})
