import {faker} from '@faker-js/faker'
describe('Create villain', () => {
  before(cy.resetData)

  const navToAddVillain = () => {
    cy.location('pathname').should('eq', '/villains')
    cy.getByCy('add-button').click()
    cy.location('pathname').should('eq', '/villains/add-villain')
    cy.getByCy('villain-detail').should('be.visible')
    cy.getByCy('input-detail-id').should('not.exist')
  }

  it('should go through the refresh flow (ui-integration)', () => {
    cy.visitStubbedEntities('villains')
    navToAddVillain()

    cy.getByCy('refresh-button').click()
    cy.location('pathname').should('eq', '/villains')
    cy.getByCy('villain-list').should('be.visible')
  })

  it('should go through the cancel flow and perform direct navigation (ui-integration)', () => {
    cy.intercept('GET', `${Cypress.env('API_URL')}/villains`, {
      fixture: 'villains',
    }).as('stubbedGetVillains')
    cy.visit('/villains/add-villain')
    cy.wait('@stubbedGetVillains')

    cy.getByCy('cancel-button').click()
    cy.location('pathname').should('eq', '/villains')
    cy.getByCy('villain-list').should('be.visible')
  })

  it('should go through the add villain flow (ui-e2e)', () => {
    cy.visitEntities('villains')
    navToAddVillain()

    const newVillain = {
      name: faker.internet.userName(),
      description: `description ${faker.internet.userName()}`,
    }
    cy.getByCy('input-detail-name').type(newVillain.name)
    cy.getByCy('input-detail-description').type(newVillain.description)
    cy.getByCy('save-button').click()

    cy.location('pathname').should('eq', '/villains')

    cy.getByCy('villains').should('be.visible')
    cy.getByCyLike('villain-list-item').should('have.length.gt', 0)
    cy.getByCy('villain-list')
      .should('contain', newVillain.name)
      .and('contain', newVillain.description)

    cy.getEntityByProperty('villain', newVillain.name).then(myVillain =>
      cy.crud('DELETE', `villains/${myVillain.id}`),
    )
  })
})
