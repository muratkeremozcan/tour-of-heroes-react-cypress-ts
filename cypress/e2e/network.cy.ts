describe('network requests', () => {
  it('should ', () => {
    cy.intercept('GET', 'http://localhost:4000/api/heroes').as('getHeroes')
    cy.visit('/')
    cy.wait('@getHeroes')
    cy.getByCy('heroes').should('be.visible')
    cy.getByCyLike('hero-list-item').should('have.length.gt', 0)
  })
})
