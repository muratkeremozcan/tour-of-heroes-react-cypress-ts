import Heroes from './Heroes'

describe('Heroes', () => {
  it('should see error on initial load with GET', () => {
    Cypress.on('uncaught:exception', () => false)
    cy.clock()
    cy.intercept('GET', `${Cypress.env('API_URL')}/heroes`, {
      statusCode: 400,
      delay: 100,
    }).as('notFound')

    cy.wrappedMount(<Heroes />)

    cy.getByCy('page-spinner').should('be.visible')
    Cypress._.times(3, () => {
      cy.tick(5100)
      cy.wait('@notFound')
    })
    cy.tick(5100)
  })

  context('200 flows', () => {
    beforeEach(() => {
      cy.intercept('GET', `${Cypress.env('API_URL')}/heroes`, {
        fixture: 'heroes.json',
      }).as('getHeroes')

      cy.wrappedMount(<Heroes />)
    })

    it('should display the hero list on render, and go through hero add & refresh flow', () => {
      cy.wait('@getHeroes')

      cy.getByCy('list-header').should('be.visible')
      cy.getByCy('hero-list').should('be.visible')

      cy.getByCy('add-button').click()
      cy.location('pathname').should('eq', '/heroes/add-hero')

      cy.getByCy('refresh-button').click()
      cy.location('pathname').should('eq', '/heroes')
    })

    const invokeHeroDelete = () => {
      cy.getByCy('delete-button').first().click()
      cy.getByCy('modal-yes-no').should('be.visible')
    }
    it('should go through the modal flow, and cover error on DELETE', () => {
      cy.getByCy('modal-yes-no').should('not.exist')

      cy.log('do not delete flow')
      invokeHeroDelete()
      cy.getByCy('button-no').click()
      cy.getByCy('modal-yes-no').should('not.exist')

      cy.log('delete flow')
      invokeHeroDelete()
      cy.intercept('DELETE', '*', {statusCode: 500}).as('deleteHero')

      cy.getByCy('button-yes').click()
      cy.wait('@deleteHero')
      cy.getByCy('modal-yes-no').should('not.exist')
      cy.getByCy('error').should('be.visible')
    })
  })
})
