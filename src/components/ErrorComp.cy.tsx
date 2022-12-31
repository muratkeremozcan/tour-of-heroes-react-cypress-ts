import ErrorComp from './ErrorComp'

describe('ErrorComp', () => {
  it('should render error', () => {
    cy.mount(<ErrorComp />)
    cy.getByCy('error').should('be.visible')
  })
})
