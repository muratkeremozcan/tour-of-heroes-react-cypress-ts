import HeroDetail from './HeroDetail'
import '../styles.scss'
import React from 'react'
import {BrowserRouter} from 'react-router-dom'

describe('HeroDetail', () => {
  context('handleSave, handleCancel', () => {
    beforeEach(() => {
      cy.window()
        .its('console')
        .then(console => cy.spy(console, 'log').as('log'))

      cy.mount(
        <BrowserRouter>
          <HeroDetail />
        </BrowserRouter>,
      )
    })
    it('should handle Save', () => {
      cy.getByCy('save-button').click()
      cy.get('@log').should('have.been.calledWith', 'handleSave')
    })

    it('should handle Cancel', () => {
      cy.getByCy('cancel-button').click()
      cy.location('pathname').should('eq', '/heroes')
    })
  })

  context('handleNameChange, handleDescriptionChange', () => {
    beforeEach(() => {
      cy.spy(React, 'useState').as('useState')

      cy.mount(
        <BrowserRouter>
          <HeroDetail />
        </BrowserRouter>,
      )
    })

    it('should handle name change', () => {
      const newHeroName = 'abc'
      cy.getByCy('input-detail-name').type(newHeroName)

      cy.get('@useState')
        .should('have.been.called')
        .its('returnValues')
        .its(newHeroName.length + 1)
        .its(0)
        .its('name')
        .should('eq', newHeroName)
    })

    it('should handle description change', () => {
      const newHeroDescription = '123'
      cy.getByCy('input-detail-description').type(newHeroDescription)
      cy.get('@useState')
        .should('have.been.called')
        .its('returnValues')
        .its(newHeroDescription.length + 1)
        .its(0)
        .its('description')
        .should('eq', newHeroDescription)
    })
  })

  context('state: should verify the layout of the component', () => {
    it('id: false, name: false - should verify the minimal state of the component', () => {
      cy.mount(
        <BrowserRouter>
          <HeroDetail />
        </BrowserRouter>,
      )

      cy.get('p').then($el => cy.wrap($el.text()).should('equal', ''))
      cy.getByCyLike('input-detail').should('have.length', 2)
      cy.getByCy('input-detail-id').should('not.exist')

      cy.findByPlaceholderText('e.g. Colleen')
      cy.findByPlaceholderText('e.g. dance fight!')

      cy.getByCy('save-button').should('be.visible')
      cy.getByCy('cancel-button').should('be.visible')
    })
  })
})
