import App from './App'

describe('ct sanity', () => {
  it('should render the App', () => {
    cy.mount(<App />)
    cy.getByCy('greeting').should('be.visible')
  })
})
