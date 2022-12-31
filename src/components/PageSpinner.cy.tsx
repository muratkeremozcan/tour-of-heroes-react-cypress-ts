import PageSpinner from './PageSpinner'

describe('PageSpinner', () => {
  it('should render the page spinner', () => {
    cy.mount(<PageSpinner />)
    cy.getByCyLike('page-spinner').should('be.visible')
  })
})
