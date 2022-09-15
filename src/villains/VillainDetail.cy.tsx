import VillainDetail from './VillainDetail'
import '../styles.scss'

describe('VillainDetail', () => {
  beforeEach(() => {
    cy.wrappedMount(<VillainDetail />)
  })

  it('should handle Save', () => {
    cy.intercept('POST', '*', {statusCode: 200}).as('postVillain')
    cy.getByCy('save-button').click()
    cy.wait('@postVillain')
  })

  it('should handle non-200 Save', () => {
    cy.intercept('POST', '*', {statusCode: 400, delay: 100}).as('postVillain')
    cy.getByCy('save-button').click()
    cy.getByCy('spinner')
    cy.wait('@postVillain')
    cy.getByCy('error')
  })

  it('should handle Cancel', () => {
    cy.getByCy('cancel-button').click()
    cy.location('pathname').should('eq', '/villains')
  })

  it('should handle name change', () => {
    const newVillainName = 'abc'
    cy.getByCy('input-detail-name').type(newVillainName)

    cy.findByDisplayValue(newVillainName).should('be.visible')
  })

  it('should handle description change', () => {
    const newVillainDescription = '123'
    cy.getByCy('input-detail-description').type(newVillainDescription)

    cy.findByDisplayValue(newVillainDescription).should('be.visible')
  })

  it('id: false, name: false - should verify the minimal state of the component', () => {
    cy.get('p').then($el => cy.wrap($el.text()).should('equal', ''))
    cy.getByCyLike('input-detail').should('have.length', 2)
    cy.getByCy('input-detail-id').should('not.exist')

    cy.findByPlaceholderText('e.g. Colleen').should('be.visible')
    cy.findByPlaceholderText('e.g. dance fight!').should('be.visible')

    cy.getByCy('save-button').should('be.visible')
    cy.getByCy('cancel-button').should('be.visible')
  })
})
