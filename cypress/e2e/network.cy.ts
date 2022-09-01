describe('network requests', () => {
  beforeEach(() => {
    cy.intercept('GET', `${Cypress.env('API_URL')}/heroes`).as('getHeroes')
    cy.visit('/')
    cy.wait('@getHeroes')
  })
  it('should ', () => {
    cy.getByCy('heroes').should('be.visible')
    cy.getByCyLike('hero-list-item').should('have.length.gt', 0)
  })
})
