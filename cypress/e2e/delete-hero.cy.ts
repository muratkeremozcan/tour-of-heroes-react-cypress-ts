describe('Delete hero', () => {
  before(cy.resetData)

  beforeEach(() => {
    cy.intercept('GET', `${Cypress.env('API_URL')}/heroes`).as('getHeroes')
    cy.visit('/')
    cy.wait('@getHeroes')
  })

  it('should go through the cancel flow', () => {
    cy.visitStubbedHeroes()

    cy.getByCy('delete-button').first().click()
    cy.getByCy('modal-yes-no').within(() => cy.getByCy('button-no').click())
  })

  it('should go through the edit flow (ui-e2e)', () => {
    cy.visitHeroes()

    cy.crud('GET', 'heroes')
      .its('body')
      .then(heroes => {
        const heroIndex = Cypress._.random(0, heroes.length - 1)

        cy.getByCyLike('hero-list-item').should('have.length', heroes.length)

        cy.getByCy('delete-button').eq(heroIndex).click()
        cy.getByCy('modal-yes-no').within(() =>
          cy.getByCy('button-yes').click(),
        )

        cy.getByCy('hero-list')
          .should('be.visible')
          .should('not.contain', heroes[heroIndex].name)
          .and('not.contain', heroes[heroIndex].description)
      })
  })
})
