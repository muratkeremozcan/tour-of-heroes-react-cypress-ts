import App from './App'

describe('ct sanity', () => {
  it('should render the App', () => {
    cy.mount(<App />)
    cy.getByCy('not-found').should('be.visible')

    cy.get(`[href="/heroes"]`).click()
    cy.getByCy('heroes').should('be.visible')

    cy.get(`[href="/about"]`).click()
    cy.getByCy('about').should('be.visible')
  })
})
