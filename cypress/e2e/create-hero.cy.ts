// TODO: enhance this test when the backend is operational

describe('Create hero', () => {
  beforeEach(() => {
    cy.intercept('GET', `${Cypress.env('API_URL')}/heroes`).as('getHeroes')
    cy.visit('/')
    cy.wait('@getHeroes')
  })

  it('should go through the cancel flow', () => {
    cy.location('pathname').should('eq', '/heroes')

    cy.getByCy('add-button').click()
    cy.location('pathname').should('eq', '/heroes/add-hero')
    cy.getByCy('hero-detail').should('be.visible')
    cy.getByCy('input-detail-id').should('not.exist')

    cy.getByCy('refresh-button').click()
    cy.location('pathname').should('eq', '/heroes')
    cy.getByCy('hero-list').should('be.visible')
  })
})
