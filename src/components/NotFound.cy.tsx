import NotFound from './NotFound'

describe('NotFound', () => {
  it('should', () => {
    cy.mount(<NotFound />)

    cy.getByCy('not-found').should('be.visible')
    cy.get('svg')
    cy.get('span').contains("These aren't the bits you're looking for")
  })
})
