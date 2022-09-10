import PageSpinner from './PageSpinner'
import '../styles.scss'

describe('PageSpinner', () => {
  it('should render the page spinner', () => {
    cy.mount(<PageSpinner />)
    cy.getByCyLike('page-spinner').should('be.visible')
  })
})
