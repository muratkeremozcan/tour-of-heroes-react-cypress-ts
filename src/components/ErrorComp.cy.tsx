import ErrorComp from './ErrorComp'
import '../styles.scss'

describe('ErrorComp', () => {
  it('should render error', () => {
    cy.mount(<ErrorComp />)
    cy.getByCy('error').should('be.visible')
  })
})
