import App from './App'

describe('ct sanity', () => {
  it('should render the App', () => {
    cy.mount(<App />)
    cy.getByCy('not-found').should('be.visible')

    cy.contains('Heroes').click()
    cy.getByCy('heroes').should('be.visible')

    cy.contains('About').click()
    cy.getByCy('about').should('be.visible')
  })
})

// CT vs RTL: src/App.test.tsx
