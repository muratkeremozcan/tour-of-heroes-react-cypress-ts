import Boys from './Boys'

describe('Boys', () => {
  it('should see error on initial load with GET', () => {
    Cypress.on('uncaught:exception', () => false)
    cy.clock()
    cy.intercept('GET', `${Cypress.env('API_URL')}/boys`, {
      statusCode: 400,
      delay: 100,
    }).as('notFound')

    cy.wrappedMount(<Boys />)

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
      cy.intercept('GET', `${Cypress.env('API_URL')}/boys`, {
        fixture: 'boys.json',
      }).as('getBoys')

      cy.wrappedMount(<Boys />)
    })

    it('should display the boy list on render, and go through boy add & refresh flow', () => {
      cy.wait('@getBoys')

      cy.getByCy('list-header').should('be.visible')
      cy.getByCy('boy-list').should('be.visible')

      cy.getByCy('add-button').click()
      cy.location('pathname').should('eq', '/boys/add-boy')

      cy.getByCy('refresh-button').click()
      cy.location('pathname').should('eq', '/boys')
    })

    const invokeBoyDelete = () => {
      cy.getByCy('delete-button').first().click()
      cy.getByCy('modal-yes-no').should('be.visible')
    }
    it('should go through the modal flow, and cover error on DELETE', () => {
      cy.getByCy('modal-yes-no').should('not.exist')

      cy.log('do not delete flow')
      invokeBoyDelete()
      cy.getByCy('button-no').click()
      cy.getByCy('modal-yes-no').should('not.exist')

      cy.log('delete flow')
      invokeBoyDelete()
      cy.intercept('DELETE', '*', {statusCode: 500}).as('deleteBoy')

      cy.getByCy('button-yes').click()
      cy.wait('@deleteBoy')
      cy.getByCy('modal-yes-no').should('not.exist')
      cy.getByCy('error').should('be.visible')
    })
  })
})
