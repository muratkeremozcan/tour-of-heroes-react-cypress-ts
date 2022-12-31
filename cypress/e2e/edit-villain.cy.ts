import {faker} from '@faker-js/faker'
import {Villain} from '../../src/models/Villain'
import '@testing-library/cypress/add-commands'
describe('Edit villain', () => {
  before(cy.resetData)

  /** Verifies villain info on Edit page */
  const verifyVillain = (villains: Villain[], villainIndex: number) => {
    cy.location('pathname').should('include', '/villains/edit-villain/')
    cy.getByCy('villain-detail').should('be.visible')
    cy.getByCy('input-detail-id').should('be.visible')
    cy.findByDisplayValue(villains[villainIndex].id)
    cy.findByDisplayValue(villains[villainIndex].name)
    cy.findByDisplayValue(villains[villainIndex].description)
  }

  const randomVillainIndex = (villains: Villain[]) =>
    Cypress._.random(0, villains.length - 1)

  it('should go through the cancel flow for a random villain (ui-integration)', () => {
    cy.visitStubbedEntities('villains')

    cy.fixture('villains').then(villains => {
      const villainIndex = randomVillainIndex(villains)
      cy.getByCy('edit-button').eq(villainIndex).click()
      verifyVillain(villains, villainIndex)
    })

    cy.getByCy('cancel-button').click()
    cy.location('pathname').should('eq', '/villains')
    cy.getByCy('villain-list').should('be.visible')
  })

  it('should go through the PUT error flow (ui-integration)', () => {
    cy.visitStubbedEntities('villains')

    cy.fixture('villains').then(villains => {
      const villainIndex = randomVillainIndex(villains)
      cy.getByCy('edit-button').eq(villainIndex).click()
      verifyVillain(villains, villainIndex)
    })

    cy.intercept('PUT', `${Cypress.env('API_URL')}/villains/*`, {
      statusCode: 500,
      delay: 100,
    }).as('isUpdateError')

    cy.getByCy('save-button').click()
    cy.getByCy('spinner')
    cy.wait('@isUpdateError')
    cy.getByCy('error')
  })

  it('should navigate to add from an existing villain (ui-integration)', () => {
    cy.visitStubbedEntities('villains')

    cy.fixture('villains').then(villains => {
      const villainIndex = randomVillainIndex(villains)
      cy.getByCy('edit-button').eq(villainIndex).click()
      verifyVillain(villains, villainIndex)

      cy.getByCy('add-button').click()
      cy.getByCy('input-detail-id').should('not.exist')
      cy.findByDisplayValue(villains[villainIndex].name).should('not.exist')
      cy.findByDisplayValue(villains[villainIndex].description).should(
        'not.exist',
      )
    })
  })

  it('should go through the edit flow (ui-e2e)', () => {
    const newVillain: Villain = {
      id: faker.datatype.uuid(),
      name: faker.internet.userName(),
      description: `description ${faker.internet.userName()}`,
    }

    cy.crud('POST', 'villains', {body: newVillain})

    cy.visit(`villains/edit-villain/${newVillain.id}`, {
      qs: {name: newVillain.name, description: newVillain.description},
    })

    const editedVillain = {
      name: faker.internet.userName(),
      description: `description ${faker.internet.userName()}`,
    }

    cy.getByCy('input-detail-name')
      .find('.input')
      .clear()
      .type(`${editedVillain.name}`)
    cy.getByCy('input-detail-description')
      .find('.input')
      .clear()
      .type(`${editedVillain.description}`)
    cy.getByCy('save-button').click()

    cy.getByCy('villain-list')
      .should('be.visible')
      .should('contain', editedVillain.name)
      .and('contain', editedVillain.description)

    cy.getEntityByProperty('villain', newVillain.id).then(
      (myVillain: Villain) => cy.crud('DELETE', `villains/${myVillain.id}`),
    )
  })
})
