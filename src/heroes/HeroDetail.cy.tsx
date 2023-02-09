import HeroDetail from './HeroDetail'

import '@testing-library/cypress/add-commands'

describe('HeroDetail', () => {
  beforeEach(() => {
    cy.wrappedMount(<HeroDetail />)
  })

  it('should handle Save', () => {
    cy.intercept('POST', '*', {statusCode: 200}).as('postHero')
    cy.getByCy('save-button').click()
    cy.wait('@postHero')
  })

  it('should handle non-200 Save', () => {
    cy.intercept('POST', '*', {statusCode: 400, delay: 100}).as('postHero')
    cy.getByCy('save-button').click()
    cy.getByCy('spinner')
    cy.wait('@postHero')
    cy.getByCy('error')
  })

  it('should handle Cancel', () => {
    cy.getByCy('cancel-button').click()
    cy.location('pathname').should('eq', '/heroes')
  })

  it('should handle name change', () => {
    const newHeroName = 'abc'
    cy.getByCy('input-detail-name').type(newHeroName)

    cy.findByDisplayValue(newHeroName).should('be.visible')
  })

  it('should handle description change', () => {
    const newHeroDescription = '123'
    cy.getByCy('input-detail-description').type(newHeroDescription)

    cy.findByDisplayValue(newHeroDescription).should('be.visible')
  })

  it('id: false, name: false - should verify the minimal state of the component', () => {
    cy.get('p').then($el => cy.wrap($el.text()).should('equal', ''))
    cy.getByCyLike('input-detail').should('have.length', 2)
    cy.getByCy('input-detail-id').should('not.exist')

    cy.findByPlaceholderText('e.g. Colleen').should('be.visible')
    cy.findByPlaceholderText('e.g. dance fight!').should('be.visible')

    cy.getByCy('save-button').should('be.visible')
    cy.getByCy('cancel-button').should('be.visible')
  })
})
