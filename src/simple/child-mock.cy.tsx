import HeaderBar from '../components/HeaderBar'
import * as HeaderBarBrand from '../components/HeaderBarBrand'
import {BrowserRouter} from 'react-router-dom'
import '../styles.scss'
import React from 'react'

const mockHeaderBarBrand = React.createElement('div', {
  children: [React.createElement('span', {children: 'mockHeaderBarBrand'})],
})
describe('Should mock the child component HeaderBarBrand in HeaderBar', () => {
  it('should spy on child component', () => {
    // we want to make this work, but it has no effect
    cy.stub(HeaderBarBrand, 'default')
      .as('HeaderBarBrand')
      .returns(mockHeaderBarBrand)

    cy.mount(
      <BrowserRouter>
        <HeaderBar />
      </BrowserRouter>,
    )

    // cy.contains('hello')
  })
})
