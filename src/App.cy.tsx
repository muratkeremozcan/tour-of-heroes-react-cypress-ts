import App from './App'

describe('ct sanity', () => {
  it('should render the App', () => {
    cy.intercept('GET', `${Cypress.env('API_URL')}/heroes`, {
      fixture: 'heroes.json',
    }).as('getHeroes')

    cy.intercept('GET', `${Cypress.env('API_URL')}/villains`, {
      fixture: 'villains.json',
    }).as('getVillains')

    cy.intercept('GET', `${Cypress.env('API_URL')}/boys`, {
      fixture: 'boys.json',
    })

    cy.mount(<App />)
    cy.getByCy('not-found').should('be.visible')

    cy.contains('Heroes').click()
    cy.getByCy('heroes').should('be.visible')

    cy.contains('Villains').click()
    cy.getByCy('villains').should('be.visible')

    cy.contains('Boys').click()
    cy.getByCy('boys').should('be.visible')

    cy.contains('About').click()
    cy.getByCy('about').should('be.visible')
  })
})
