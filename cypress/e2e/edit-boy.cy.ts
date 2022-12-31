import {faker} from '@faker-js/faker'
import {Boy} from '../../src/models/Boy'
import '@testing-library/cypress/add-commands'
describe('Edit boy', () => {
  before(cy.resetData)

  /** Verifies boy info on Edit page */
  const verifyBoy = (boys: Boy[], heroIndex: number) => {
    cy.location('pathname').should('include', '/boys/edit-boy/')
    cy.getByCy('boy-detail').should('be.visible')
    cy.getByCy('input-detail-id').should('be.visible')
    cy.findByDisplayValue(boys[heroIndex].id)
    cy.findByDisplayValue(boys[heroIndex].name)
    cy.findByDisplayValue(boys[heroIndex].description)
  }

  const randomBoyIndex = (boys: Boy[]) => Cypress._.random(0, boys.length - 1)

  it('should go through the cancel flow for a random boy (ui-integration)', () => {
    cy.visitStubbedEntities('boys')

    cy.fixture('boys').then(boys => {
      const heroIndex = randomBoyIndex(boys)
      cy.getByCy('edit-button').eq(heroIndex).click()
      verifyBoy(boys, heroIndex)
    })

    cy.getByCy('cancel-button').click()
    cy.location('pathname').should('eq', '/boys')
    cy.getByCy('boy-list').should('be.visible')
  })

  it('should go through the PUT error flow (ui-integration)', () => {
    cy.visitStubbedEntities('boys')

    cy.fixture('boys').then(boys => {
      const heroIndex = randomBoyIndex(boys)
      cy.getByCy('edit-button').eq(heroIndex).click()
      verifyBoy(boys, heroIndex)
    })

    cy.intercept('PUT', `${Cypress.env('API_URL')}/boys/*`, {
      statusCode: 500,
      delay: 100,
    }).as('isUpdateError')

    cy.getByCy('save-button').click()
    cy.getByCy('spinner')
    cy.wait('@isUpdateError')
    cy.getByCy('error')
  })

  it('should navigate to add from an existing boy (ui-integration)', () => {
    cy.visitStubbedEntities('boys')

    cy.fixture('boys').then(boys => {
      const heroIndex = randomBoyIndex(boys)
      cy.getByCy('edit-button').eq(heroIndex).click()
      verifyBoy(boys, heroIndex)

      cy.getByCy('add-button').click()
      cy.getByCy('input-detail-id').should('not.exist')
      cy.findByDisplayValue(boys[heroIndex].name).should('not.exist')
      cy.findByDisplayValue(boys[heroIndex].description).should('not.exist')
    })
  })

  it('should go through the edit flow (ui-e2e)', () => {
    const newBoy: Boy = {
      id: faker.datatype.uuid(),
      name: faker.internet.userName(),
      description: `description ${faker.internet.userName()}`,
    }

    cy.crud('POST', 'boys', {body: newBoy})

    cy.visit(`boys/edit-boy/${newBoy.id}`, {
      qs: {name: newBoy.name, description: newBoy.description},
    })

    const editedBoy = {
      name: faker.internet.userName(),
      description: `description ${faker.internet.userName()}`,
    }

    cy.getByCy('input-detail-name')
      .find('.input')
      .clear()
      .type(`${editedBoy.name}`)
    cy.getByCy('input-detail-description')
      .find('.input')
      .clear()
      .type(`${editedBoy.description}`)
    cy.getByCy('save-button').click()

    cy.getByCy('boy-list')
      .should('be.visible')
      .should('contain', editedBoy.name)
      .and('contain', editedBoy.description)

    cy.getEntityByProperty('boy', newBoy.id).then((myBoy: Boy) =>
      cy.crud('DELETE', `boys/${myBoy.id}`),
    )
  })
})
