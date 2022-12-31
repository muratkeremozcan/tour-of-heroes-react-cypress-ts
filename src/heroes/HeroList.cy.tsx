import HeroList from './HeroList'

import heroes from '../../cypress/fixtures/heroes.json'

describe('HeroList', () => {
  it('no heroes should not display a list nor search bar', () => {
    cy.wrappedMount(
      <HeroList
        heroes={[]}
        handleDeleteHero={cy.stub().as('handleDeleteHero')}
      />,
    )

    cy.getByCy('hero-list').should('exist')
    cy.getByCyLike('hero-list-item').should('not.exist')
    cy.getByCy('search').should('not.exist')
  })

  context('with heroes in the list', () => {
    beforeEach(() => {
      cy.wrappedMount(
        <HeroList
          heroes={heroes}
          handleDeleteHero={cy.stub().as('handleDeleteHero')}
        />,
      )
    })

    it('should render the hero layout', () => {
      cy.getByCyLike('hero-list-item').should('have.length', heroes.length)

      cy.getByCy('card-content')
      cy.contains(heroes[0].name)
      cy.contains(heroes[0].description)

      cy.get('footer')
        .first()
        .within(() => {
          cy.getByCy('delete-button')
          cy.getByCy('edit-button')
        })
    })

    it('should search and filter hero by name and description', () => {
      cy.getByCy('search').type(heroes[0].name)
      cy.getByCyLike('hero-list-item')
        .should('have.length', 1)
        .contains(heroes[0].name)

      cy.getByCy('search').clear().type(heroes[2].description)
      cy.getByCyLike('hero-list-item')
        .should('have.length', 1)
        .contains(heroes[2].description)
    })

    it('should handle delete', () => {
      cy.getByCy('delete-button').first().click()
      cy.get('@handleDeleteHero').should('have.been.called')
    })

    it('should handle edit', () => {
      cy.getByCy('edit-button').first().click()
      cy.location('pathname').should('eq', '/heroes/edit-hero/' + heroes[0].id)
    })
  })
})
