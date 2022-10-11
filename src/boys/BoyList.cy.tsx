import BoyDetail from './BoyDetail'
import '../styles.scss'

describe('BoyDetail', () => {
  beforeEach(() => {
    cy.wrappedMount(<BoyDetail />)
  })

  it('should handle Save', () => {
    cy.intercept('POST', '*', {statusCode: 200}).as('postBoy')
    cy.getByCy('save-button').click()
    cy.wait('@postBoy')
  })

  it('should handle non-200 Save', () => {
    cy.intercept('POST', '*', {statusCode: 400, delay: 100}).as('postBoy')
    cy.getByCy('save-button').click()
    cy.getByCy('spinner')
    cy.wait('@postBoy')
    cy.getByCy('error')
  })

  it('should handle Cancel', () => {
    cy.getByCy('cancel-button').click()
    cy.location('pathname').should('eq', '/boys')
  })

  it('should handle name change', () => {
    const newBoyName = 'abc'
    cy.getByCy('input-detail-name').type(newBoyName)

    cy.findByDisplayValue(newBoyName).should('be.visible')
  })

  it('should handle description change', () => {
    const newBoyDescription = '123'
    cy.getByCy('input-detail-description').type(newBoyDescription)

    cy.findByDisplayValue(newBoyDescription).should('be.visible')
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
