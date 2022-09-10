import {faker} from '@faker-js/faker'
import {Hero} from '../../src/models/Hero'
describe('Delete hero', () => {
  before(cy.resetData)

  const yesOnModal = () =>
    cy.getByCy('modal-yes-no').within(() => cy.getByCy('button-yes').click())

  it('should go through the cancel flow (ui-integration)', () => {
    cy.visitStubbedHeroes()

    cy.getByCy('delete-button').first().click()
    cy.getByCy('modal-yes-no').within(() => cy.getByCy('button-no').click())
    cy.getByCy('heroes').should('be.visible')
    cy.get('modal-yes-no').should('not.exist')
  })

  it('should go through the DELETE error flow (ui-integration)', () => {
    cy.visitStubbedHeroes()
    cy.intercept('DELETE', `${Cypress.env('API_URL')}/heroes/*`, {
      statusCode: 500,
    }).as('isDeleteError')

    cy.getByCy('delete-button').eq(0).click()
    yesOnModal()

    cy.wait('@isDeleteError')
    cy.getByCy('error')
  })

  it('should go through the edit flow (ui-e2e)', () => {
    const hero: Hero = {
      id: faker.datatype.uuid(),
      name: faker.internet.userName(),
      description: `description ${faker.internet.userName()}`,
    }

    cy.crud('POST', 'heroes', {body: hero})

    cy.visitHeroes()

    cy.findHeroIndex(hero.id).then(({heroIndex, heroesArray}) => {
      cy.getByCy('delete-button').eq(heroIndex).click()

      yesOnModal()

      cy.getByCy('hero-list')
        .should('be.visible')
        .should('not.contain', heroesArray[heroIndex].name)
        .and('not.contain', heroesArray[heroIndex].description)
    })
  })
})
