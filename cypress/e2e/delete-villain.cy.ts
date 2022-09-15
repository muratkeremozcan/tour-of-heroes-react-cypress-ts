import {faker} from '@faker-js/faker'
import {Villain} from '../../src/models/Villain'
describe('Delete villain', () => {
  before(cy.resetData)

  const yesOnModal = () =>
    cy.getByCy('modal-yes-no').within(() => cy.getByCy('button-yes').click())

  it('should go through the cancel flow (ui-integration)', () => {
    cy.visitStubbedVillains()

    cy.getByCy('delete-button').first().click()
    cy.getByCy('modal-yes-no').within(() => cy.getByCy('button-no').click())
    cy.getByCy('villains').should('be.visible')
    cy.get('modal-yes-no').should('not.exist')
  })

  it('should go through the edit flow (ui-e2e)', () => {
    const villain: Villain = {
      id: faker.datatype.uuid(),
      name: faker.internet.userName(),
      description: `description ${faker.internet.userName()}`,
    }

    cy.crud('POST', 'villains', {body: villain})

    cy.visitVillains()

    cy.findVillainIndex(villain.id).then(({villainIndex, villainsArray}) => {
      cy.getByCy('delete-button').eq(villainIndex).click()

      yesOnModal()

      cy.getByCy('villain-list')
        .should('be.visible')
        .should('not.contain', villainsArray[villainIndex].name)
        .and('not.contain', villainsArray[villainIndex].description)
    })
  })
})
