import VillainDetail from '../villains/VillainDetail'
import '../styles.scss'
import React from 'react'
import * as InputDetail from '../components/InputDetail'
import * as sum from './sum'
// mock the child component InputDetail in VillainDetail parent component

describe('Should mock the child component InputDetail in VillainDetail parent component', () => {
  it('should spy on child component', () => {
    const mockInputDetail = React.createElement('span', {
      children: 'InputDetail',
    })
    // we want to make this work, but it has no effect
    cy.stub(InputDetail, 'default').as('mockInputDetail').value('div')

    cy.wrappedMount(<VillainDetail />)
    // cy.get('@mockInputDetail').should('have.been.called')

    // the same thing works with a simple module
    cy.stub(sum, 'default').as('sum').returns(5) // ok for the compiler
    const result = sum.default(1, 2)
    cy.get('@sum').should('be.called')
    expect(result).to.equal(5)
  })
})
