import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import StylesContext from '../../client/scripts/components/StylesContext/StylesContext'
import Header from '../../client/scripts/components/Header/Header.jsx'

describe('Component: Header', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(
      <StylesContext onInsertCss={() => {}}>
        <Header />
      </StylesContext>
    )

    expect(wrapper.length).to.equal(1)
  })
})
