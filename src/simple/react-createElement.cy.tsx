import VillainDetail from '../villains/VillainDetail'
import '../styles.scss'
import React from 'react'
const mockInputDetail = React.createElement('div', {
  children: [React.createElement('span', {children: 'InputDetail'})],
})

describe('Spy on / Stub React.createElement', () => {
  it('should spy on React.creteElement', () => {
    cy.spy(React, 'createElement').as('createElement')
    cy.wrappedMount(<VillainDetail />)

    cy.get('@createElement').should('have.been.called')
  })

  it('should stub React.createElement', () => {
    cy.stub(React, 'createElement').as('createElement').returns(mockInputDetail)
    cy.wrappedMount(<VillainDetail />)

    cy.get('@createElement').should('have.been.called')
    cy.contains('span', 'InputDetail')
  })
})
