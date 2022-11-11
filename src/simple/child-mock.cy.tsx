import HeaderBar from '../components/HeaderBar'
import '../styles.scss'
import React from 'react'
import * as HeaderBarBrand from '../components/HeaderBarBrand'
import * as sum from './sum'
// mock the child component HeaderBarBrand in HeaderBar parent component

describe('Should mock the child component HeaderBarBrand in HeaderBar parent component', () => {
  it('should spy on child component', () => {
    const mockHeaderBarBrand = React.createElement('span', {
      children: 'HeaderBarBrand',
    })

    // we want to make this work, but it has no effect
    cy.stub(HeaderBarBrand, 'default')
      .as('mockHeaderBarBrand')
      .value(mockHeaderBarBrand)
    cy.wrappedMount(<HeaderBar />)
    // cy.get('@mockHeaderBarBrand').should('have.been.called')

    // the same thing works with a simple module
    cy.stub(sum, 'default').as('sum').returns(5) // ok for the compiler
    const result = sum.default(1, 2)
    cy.get('@sum').should('be.called')
    expect(result).to.equal(5)
  })
})
