import HeaderBar from '../components/HeaderBar'
import * as HeaderBarBrand from '../components/HeaderBarBrand'
import {BrowserRouter} from 'react-router-dom'
import '../styles.scss'
import React from 'react'

const mockHeaderBarBrand = React.createElement('div', {
  children: [React.createElement('span', {children: 'mockHeaderBarBrand'})],
})
describe('Mocking child components in a parent', () => {
  it('Should mock the child component HeaderBarBrand in HeaderBar', () => {
    // we want to make this work, but it has no effect
    cy.stub(HeaderBarBrand, 'default')
      .as('HeaderBarBrand')
      .returns(mockHeaderBarBrand)

    // cy.mount(mockHeaderBarBrand) // this makes it sure that the mock is ok
    // it just doesn't get used when we mount the parent component
    cy.mount(
      <BrowserRouter>
        <HeaderBar />
      </BrowserRouter>,
    )

    // cy.contains('hello')
  })
})
