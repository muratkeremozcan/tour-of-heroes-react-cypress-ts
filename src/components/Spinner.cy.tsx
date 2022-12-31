import Spinner from './Spinner'

describe('Spinner', () => {
  it('should render a spinner', () => {
    cy.mount(<Spinner />)
    cy.getByCy('spinner').should('be.visible')
  })
})
