import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
// import StylesContext from '../../client/scripts/components/StylesContext/StylesContext'
import Home from '../../client/scripts/components/Home/Home.jsx'

describe('Component: Home', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(
      <Home />
    )

    expect(wrapper.length).to.equal(1)
  })
})
