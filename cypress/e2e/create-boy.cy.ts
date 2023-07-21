import {faker} from '@faker-js/faker'
describe('Create boy', () => {
  before(cy.resetData)

  const navToAddBoy = () => {
    cy.location('pathname').should('eq', '/boys')
    cy.getByCy('add-button').click()
    cy.location('pathname').should('eq', '/boys/add-boy')
    cy.getByCy('boy-detail').should('be.visible')
    cy.getByCy('input-detail-id').should('not.exist')
  }

  it('should go through the refresh flow (ui-integration)', () => {
    cy.visitStubbedEntities('boys')
    navToAddBoy()

    cy.getByCy('refresh-button').click()
    cy.location('pathname').should('eq', '/boys')
    cy.getByCy('boy-list').should('be.visible')
  })

  it('should go through the cancel flow and perform direct navigation (ui-integration)', () => {
    cy.intercept('GET', `${Cypress.env('API_URL')}/boys`, {
      fixture: 'boys',
    }).as('stubbedGetBoys')
    cy.visit('/boys/add-boy')
    cy.wait('@stubbedGetBoys')

    cy.getByCy('cancel-button').click()
    cy.location('pathname').should('eq', '/boys')
    cy.getByCy('boy-list').should('be.visible')
  })

  it('should go through the add boy flow (ui-e2e)', () => {
    cy.visitEntities('boys')
    navToAddBoy()

    const newBoy = {
      name: faker.internet.userName(),
      description: `description ${faker.internet.userName()}`,
    }
    cy.getByCy('input-detail-name').type(newBoy.name)
    cy.getByCy('input-detail-description').type(newBoy.description)
    cy.getByCy('save-button').click()

    cy.location('pathname').should('eq', '/boys')

    cy.getByCy('boys').should('be.visible')
    cy.getByCyLike('boy-list-item').should('have.length.gt', 0)
    cy.getByCy('boy-list')
      .should('contain', newBoy.name)
      .and('contain', newBoy.description)

    cy.getEntityByProperty('boy', newBoy.name).then(myBoy =>
      cy.crud('DELETE', `boys/${myBoy.id}`),
    )
  })
})
