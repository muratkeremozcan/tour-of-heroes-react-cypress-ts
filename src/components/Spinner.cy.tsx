import Spinner from './Spinner'
import '../styles.scss'

describe('Spinner', () => {
  it('should render a spinner', () => {
    cy.mount(<Spinner />)
    cy.getByCy('spinner').should('be.visible')
  })
})
