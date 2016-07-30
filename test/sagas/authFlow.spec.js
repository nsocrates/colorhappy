import { expect } from 'chai'
import { api, tryAuth } from '../../client/scripts/redux/services'
import { login } from '../../client/scripts/redux/actions/auth'
import { put, call } from 'redux-saga/effects'

describe('Auth Flow', () => {
  it('should return LOGIN_FAIL action', () => {
    const action = { username: 'me@me.com' }
    const generator = tryAuth(login, api.login, action)

    expect(generator.next().value).to.deep.equal(call(api.login, action))

    expect(generator.throw('login failed').value
    ).to.deep.equal(
      put({
        payload: action,
        type: 'LOGIN_FAILURE',
        error: 'login failed',
      })
    )
  })
})
