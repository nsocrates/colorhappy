import { expect } from 'chai'
import { watchAuth } from '../../client/scripts/redux/sagas/auth'
import { api, tryAuth } from '../../client/scripts/services'
import { login } from '../../client/scripts/redux/actions/auth'
import { put, call } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'

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

  it('should return LOGIN_SUCCESS action', () => {
    const action = { payload: { username: 'me' } }
    const response = { token: '12345' }
    const generator = watchAuth(true)

    expect(generator.next().value).to.deep.equal(takeEvery('LOGIN_REQUEST'))
    expect(generator.next(action).value).to.deep.equal(call(tryAuth, login, api.login, action.payload))
    expect(generator.next(response).value).to.deep.equal(put({
      type: 'LOGIN_SUCCESS',
      response,
    }))
  })
})
