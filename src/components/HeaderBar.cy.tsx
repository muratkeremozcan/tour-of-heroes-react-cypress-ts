import HeaderBar from './HeaderBar'
import '../styles.scss'

describe('HeaderBar', () => {
  it('should', () => {
    cy.wrappedMount(<HeaderBar />)
    cy.getByCy('header-bar-brand')
  })
})
