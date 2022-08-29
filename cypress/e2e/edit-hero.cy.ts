// TODO: enhance this test when the backend is operational
import heroes from '../fixtures/heroes.json'

describe('Edit hero', () => {
  beforeEach(() => cy.visit('/'))
  it('should go through the cancel flow', () => {
    cy.location('pathname').should('eq', '/heroes')

    const heroIndex = 0

    cy.getByCy('edit-button').eq(heroIndex).click()
    cy.location('pathname').should('eq', '/heroes/edit-hero')
    cy.getByCy('hero-detail').should('be.visible')
    cy.getByCy('input-detail-id').should('be.visible')
    cy.findByDisplayValue(heroes[heroIndex].id).should('be.visible')
  })
})
