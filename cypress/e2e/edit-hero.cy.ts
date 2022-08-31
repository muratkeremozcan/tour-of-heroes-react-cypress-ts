// TODO: enhance this test when the backend is operational

describe('Edit hero', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:4000/api/heroes').as('getHeroes')
    cy.visit('/')
    cy.wait('@getHeroes')
  })

  it('should go through the cancel flow', () => {
    cy.location('pathname').should('eq', '/heroes')

    cy.getByCy('edit-button').first().click()
    cy.location('pathname').should('eq', '/heroes/edit-hero/HeroAslaug')
    cy.getByCy('hero-detail').should('be.visible')
    // cy.getByCy('input-detail-id').should('be.visible')

    // cy.getByCy('cancel-button').click()
    // cy.location('pathname').should('eq', '/heroes')
    // cy.getByCy('hero-list').should('be.visible')
  })
})
