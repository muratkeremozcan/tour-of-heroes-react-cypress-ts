import {faker} from '@faker-js/faker'
import {Hero} from '../../src/models/Hero'
import '@testing-library/cypress/add-commands'
describe('Edit hero', () => {
  before(cy.resetData)

  /** Verifies hero info on Edit page */
  const verifyHero = (heroes: Hero[], heroIndex: number) => {
    cy.location('pathname').should('include', '/heroes/edit-hero/')
    cy.getByCy('hero-detail').should('be.visible')
    cy.getByCy('input-detail-id').should('be.visible')
    cy.findByDisplayValue(heroes[heroIndex].id)
    cy.findByDisplayValue(heroes[heroIndex].name)
    cy.findByDisplayValue(heroes[heroIndex].description)
  }

  const randomHeroIndex = (heroes: Hero[]) =>
    Cypress._.random(0, heroes.length - 1)

  it('should go through the cancel flow for a random hero (ui-integration)', () => {
    cy.visitStubbedEntities('heroes')

    cy.fixture('heroes').then(heroes => {
      const heroIndex = randomHeroIndex(heroes)
      cy.getByCy('edit-button').eq(heroIndex).click()
      verifyHero(heroes, heroIndex)
    })

    cy.getByCy('cancel-button').click()
    cy.location('pathname').should('eq', '/heroes')
    cy.getByCy('hero-list').should('be.visible')
  })

  it('should go through the PUT error flow (ui-integration)', () => {
    cy.visitStubbedEntities('heroes')

    cy.fixture('heroes').then(heroes => {
      const heroIndex = randomHeroIndex(heroes)
      cy.getByCy('edit-button').eq(heroIndex).click()
      verifyHero(heroes, heroIndex)
    })

    cy.intercept('PUT', `${Cypress.env('API_URL')}/heroes/*`, {
      statusCode: 500,
      delay: 100,
    }).as('isUpdateError')

    cy.getByCy('save-button').click()
    cy.getByCy('spinner')
    cy.wait('@isUpdateError')
    cy.getByCy('error')
  })

  it('should navigate to add from an existing hero (ui-integration)', () => {
    cy.visitStubbedEntities('heroes')

    cy.fixture('heroes').then(heroes => {
      const heroIndex = randomHeroIndex(heroes)
      cy.getByCy('edit-button').eq(heroIndex).click()
      verifyHero(heroes, heroIndex)

      cy.getByCy('add-button').click()
      cy.getByCy('input-detail-id').should('not.exist')
      cy.findByDisplayValue(heroes[heroIndex].name).should('not.exist')
      cy.findByDisplayValue(heroes[heroIndex].description).should('not.exist')
    })
  })

  it('should go through the edit flow (ui-e2e)', () => {
    const newHero: Hero = {
      id: faker.datatype.uuid(),
      name: faker.internet.userName(),
      description: `description ${faker.internet.userName()}`,
    }

    cy.crud('POST', 'heroes', {body: newHero})

    cy.visit(`heroes/edit-hero/${newHero.id}`, {
      qs: {name: newHero.name, description: newHero.description},
    })

    const editedHero = {
      name: faker.internet.userName(),
      description: `description ${faker.internet.userName()}`,
    }

    cy.getByCy('input-detail-name')
      .find('.input')
      .clear()
      .type(`${editedHero.name}`)
    cy.getByCy('input-detail-description')
      .find('.input')
      .clear()
      .type(`${editedHero.description}`)
    cy.getByCy('save-button').click()

    cy.getByCy('hero-list')
      .should('be.visible')
      .should('contain', editedHero.name)
      .and('contain', editedHero.description)

    cy.getEntityByProperty('hero', newHero.id).then((myHero: Hero) =>
      cy.crud('DELETE', `heroes/${myHero.id}`),
    )
  })
})
