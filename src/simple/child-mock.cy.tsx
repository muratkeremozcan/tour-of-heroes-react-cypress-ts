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
    cy.stub(InputDetail, 'default')
      .as('mockInputDetail')
      .returns(mockInputDetail)

    cy.spy(sum, 'default').as('sum') // ok for the compiler
    // cy.spy(InputDetail, 'default').as('mockInputDetail') // error: Attempted to wrap undefined property default as function

    cy.wrappedMount(<VillainDetail />)
    // cy.get('@mockInputDetail').should('have.been.called')
  })
})
