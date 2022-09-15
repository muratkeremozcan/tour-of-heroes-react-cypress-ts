import {faker} from '@faker-js/faker'
import {Hero} from '../../src/models/Hero'
describe('Delete hero', () => {
  before(cy.resetData)

  const yesOnModal = () =>
    cy.getByCy('modal-yes-no').within(() => cy.getByCy('button-yes').click())

  it('should go through the cancel flow (ui-integration)', () => {
    cy.visitStubbedEntities('heroes')

    cy.getByCy('delete-button').first().click()
    cy.getByCy('modal-yes-no').within(() => cy.getByCy('button-no').click())
    cy.getByCy('heroes').should('be.visible')
    cy.get('modal-yes-no').should('not.exist')
  })

  it('should go through the edit flow (ui-e2e)', () => {
    const hero: Hero = {
      id: faker.datatype.uuid(),
      name: faker.internet.userName(),
      description: `description ${faker.internet.userName()}`,
    }

    cy.crud('POST', 'heroes', {body: hero})

    cy.visitEntities('heroes')

    cy.findEntityIndex('hero', hero.id).then(
      ({entityIndex: heroIndex, entityArray: heroArray}) => {
        cy.getByCy('delete-button').eq(heroIndex).click()

        yesOnModal()

        cy.getByCy('hero-list')
          .should('be.visible')
          .should('not.contain', heroArray[heroIndex].name)
          .and('not.contain', heroArray[heroIndex].description)
      },
    )
  })
})
