import {faker} from '@faker-js/faker'
describe('Create hero', () => {
  before(cy.resetData)

  const navToAddHero = () => {
    cy.location('pathname').should('eq', '/heroes')
    cy.getByCy('add-button').click()
    cy.location('pathname').should('eq', '/heroes/add-hero')
    cy.getByCy('hero-detail').should('be.visible')
    cy.getByCy('input-detail-id').should('not.exist')
  }

  it('should go through the refresh flow (ui-integration)', () => {
    cy.visitStubbedEntities('heroes')
    navToAddHero()

    cy.getByCy('refresh-button').click()
    cy.location('pathname').should('eq', '/heroes')
    cy.getByCy('hero-list').should('be.visible')
  })

  it('should go through the cancel flow and perform direct navigation (ui-integration)', () => {
    cy.intercept('GET', `${Cypress.env('API_URL')}/heroes`, {
      fixture: 'heroes',
    }).as('stubbedGetHeroes')
    cy.visit('/heroes/add-hero')
    cy.wait('@stubbedGetHeroes')

    cy.getByCy('cancel-button').click()
    cy.location('pathname').should('eq', '/heroes')
    cy.getByCy('hero-list').should('be.visible')
  })

  it('should go through the add hero flow (ui-e2e)', () => {
    cy.visitEntities('heroes')
    navToAddHero()

    const newHero = {
      name: faker.internet.userName(),
      description: `description ${faker.internet.userName()}`,
    }
    cy.getByCy('input-detail-name').type(newHero.name)
    cy.getByCy('input-detail-description').type(newHero.description)
    cy.getByCy('save-button').click()

    cy.location('pathname').should('eq', '/heroes')

    cy.getByCy('heroes').should('be.visible')
    cy.getByCyLike('hero-list-item').should('have.length.gt', 0)
    cy.getByCy('hero-list')
      .should('contain', newHero.name)
      .and('contain', newHero.description)

    cy.getEntityByProperty('hero', newHero.name).then(myHero =>
      cy.crud('DELETE', `heroes/${myHero.id}`),
    )
  })
})
