import HeroList from './HeroList'
import '../styles.scss'
import heroes from '../../cypress/fixtures/heroes.json'

describe('HeroList', () => {
  it('should render the item layout', () => {
    cy.mount(
      <HeroList
        heroes={heroes}
        handleDeleteHero={cy.stub().as('handleDeleteHero')}
      />,
    )

    cy.getByCyLike('hero-list-item').should('have.length', heroes.length)

    cy.getByCy('card-content')
    cy.contains(heroes[0].name)
    cy.contains(heroes[0].description)

    cy.get('footer').within(() => {
      cy.getByCy('delete-button')
      cy.getByCy('edit-button')
    })
  })

  context('handleDelete, handleEdit', () => {
    beforeEach(() => {
      cy.window()
        .its('console')
        .then(console => cy.spy(console, 'log').as('log'))

      cy.mount(
        <HeroList
          heroes={heroes}
          handleDeleteHero={cy.stub().as('handleDeleteHero')}
        />,
      )
    })
    it('should handle delete', () => {
      cy.getByCy('delete-button').first().click()
      cy.get('@handleDeleteHero').should('have.been.called')
    })
    it('should handle edit', () => {
      cy.getByCy('edit-button').first().click()
      cy.get('@log').should('have.been.calledWith', 'handleSelectHero')
    })
  })
})
