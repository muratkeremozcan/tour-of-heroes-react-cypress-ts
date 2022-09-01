import {faker} from '@faker-js/faker'

describe('Create hero', () => {
  before(() => cy.resetData())
  beforeEach(() => {
    cy.intercept('GET', `${Cypress.env('API_URL')}/heroes`).as('getHeroes')
    cy.visit('/')
    cy.wait('@getHeroes')
  })

  const navToAddHero = () => {
    cy.location('pathname').should('eq', '/heroes')

    cy.getByCy('add-button').click()
    cy.location('pathname').should('eq', '/heroes/add-hero')
    cy.getByCy('hero-detail').should('be.visible')
    cy.getByCy('input-detail-id').should('not.exist')
  }

  it('should go through the cancel flow', () => {
    navToAddHero()

    cy.getByCy('refresh-button').click()
    cy.location('pathname').should('eq', '/heroes')
    cy.getByCy('hero-list').should('be.visible')
  })

  it('should go through the add hero flow', () => {
    navToAddHero()

    const newHero = {
      name: faker.internet.userName(),
      description: `description ${faker.internet.userName()}`,
    }

    cy.getByCy('input-detail-name').type(newHero.name)
    cy.getByCy('input-detail-description').type(newHero.description)
    cy.getByCy('save-button').click()
    cy.location('pathname').should('eq', '/heroes')
    cy.getByCy('hero-list')
      .should('be.visible')
      .should('contain', newHero.name)
      .and('contain', newHero.description)

    cy.getEntityByName(newHero.name).then(myHero =>
      cy.crud('DELETE', `heroes/${myHero.id}`),
    )
  })
})
