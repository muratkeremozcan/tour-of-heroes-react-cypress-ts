import Villains from './Villains'

describe('Villains', () => {
  it('should see error on initial load with GET', () => {
    Cypress.on('uncaught:exception', () => false)
    cy.clock()
    cy.intercept('GET', `${Cypress.env('API_URL')}/villains`, {
      statusCode: 400,
      delay: 100,
    }).as('notFound')

    cy.wrappedMount(<Villains />)

    cy.getByCy('page-spinner').should('be.visible')
    Cypress._.times(3, () => {
      cy.tick(5100)
      cy.wait('@notFound')
    })
    cy.tick(5100)

    cy.getByCy('error')
  })

  context('200 flows', () => {
    beforeEach(() => {
      cy.intercept('GET', `${Cypress.env('API_URL')}/villains`, {
        fixture: 'villains.json',
      }).as('getVillains')

      cy.wrappedMount(<Villains />)
    })

    it('should display the villain list on render, and go through villain add & refresh flow', () => {
      cy.wait('@getVillains')

      cy.getByCy('list-header').should('be.visible')
      cy.getByCy('villain-list').should('be.visible')

      cy.getByCy('add-button').click()
      cy.location('pathname').should('eq', '/villains/add-villain')

      cy.getByCy('refresh-button').click()
      cy.location('pathname').should('eq', '/villains')
    })

    const invokeVillainDelete = () => {
      cy.getByCy('delete-button').first().click()
      cy.getByCy('modal-yes-no').should('be.visible')
    }
    it('should go through the modal flow, and cover error on DELETE', () => {
      cy.getByCy('modal-yes-no').should('not.exist')

      cy.log('do not delete flow')
      invokeVillainDelete()
      cy.getByCy('button-no').click()
      cy.getByCy('modal-yes-no').should('not.exist')

      cy.log('delete flow')
      invokeVillainDelete()
      cy.intercept('DELETE', '*', {statusCode: 500}).as('deleteVillain')

      cy.getByCy('button-yes').click()
      cy.wait('@deleteVillain')
      cy.getByCy('modal-yes-no').should('not.exist')
      cy.getByCy('error').should('be.visible')
    })
  })
})
