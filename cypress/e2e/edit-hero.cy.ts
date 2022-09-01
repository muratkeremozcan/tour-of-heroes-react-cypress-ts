// TODO: enhance this test when the backend is operational

describe('Edit hero', () => {
  beforeEach(() => {
    cy.intercept('GET', `${Cypress.env('API_URL')}/heroes`).as('getHeroes')
    cy.visit('/')
    cy.wait('@getHeroes')
  })

  it('should go through the cancel flow', () => {
    cy.location('pathname').should('eq', '/heroes')

    cy.getByCy('edit-button').eq(1).click()
    cy.location('pathname').should('include', '/heroes/edit-hero/')
    cy.getByCy('hero-detail').should('be.visible')
    cy.getByCy('input-detail-id').should('be.visible')
    cy.findByDisplayValue('HeroBjorn')
    cy.findByDisplayValue('Bjorn Ironside')
    cy.findByDisplayValue('king of 9th century Sweden')

    cy.getByCy('cancel-button').click()
    cy.location('pathname').should('eq', '/heroes')
    cy.getByCy('hero-list').should('be.visible')
  })
})
