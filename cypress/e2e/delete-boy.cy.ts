import {faker} from '@faker-js/faker'
import {Boy} from '../../src/models/Boy'
describe('Delete boy', () => {
  before(cy.resetData)

  const yesOnModal = () =>
    cy.getByCy('modal-yes-no').within(() => cy.getByCy('button-yes').click())

  it('should go through the cancel flow (ui-integration)', () => {
    cy.visitStubbedEntities('boys')

    cy.getByCy('delete-button').first().click()
    cy.getByCy('modal-yes-no').within(() => cy.getByCy('button-no').click())
    cy.getByCy('boys').should('be.visible')
    cy.get('modal-yes-no').should('not.exist')
  })

  it('should go through the edit flow (ui-e2e)', () => {
    const boy: Boy = {
      id: faker.datatype.uuid(),
      name: faker.internet.userName(),
      description: `description ${faker.internet.userName()}`,
    }

    cy.crud('POST', 'boys', {body: boy})

    cy.visitEntities('boys')

    cy.findEntityIndex('boy', boy.id).then(
      ({entityIndex: boyIndex, entityArray: boyArray}) => {
        cy.getByCy('delete-button').eq(boyIndex).click()

        yesOnModal()

        cy.getByCy('boy-list')
          .should('be.visible')
          .should('not.contain', boyArray[boyIndex].name)
          .and('not.contain', boyArray[boyIndex].description)
      },
    )
  })
})
