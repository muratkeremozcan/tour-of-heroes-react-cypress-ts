import BoyList from './BoyList'

import boys from '../../cypress/fixtures/boys.json'

describe('BoyList', () => {
  it('no boys should not display a list nor search bar', () => {
    cy.wrappedMount(
      <BoyList boys={[]} handleDeleteBoy={cy.stub().as('handleDeleteBoy')} />,
    )

    cy.getByCy('boy-list').should('exist')
    cy.getByCyLike('boy-list-item').should('not.exist')
    cy.getByCy('search').should('not.exist')
  })

  context('with boys in the list', () => {
    beforeEach(() => {
      cy.wrappedMount(
        <BoyList
          boys={boys}
          handleDeleteBoy={cy.stub().as('handleDeleteBoy')}
        />,
      )
    })

    it('should render the boy layout', () => {
      cy.getByCyLike('boy-list-item').should('have.length', boys.length)

      cy.getByCy('card-content')
      cy.contains(boys[0].name)
      cy.contains(boys[0].description)

      cy.get('footer')
        .first()
        .within(() => {
          cy.getByCy('delete-button')
          cy.getByCy('edit-button')
        })
    })

    it('should search and filter boy by name and description', () => {
      cy.getByCy('search').type(boys[0].name)
      cy.getByCyLike('boy-list-item')
        .should('have.length', 1)
        .contains(boys[0].name)

      cy.getByCy('search').clear().type(boys[2].description)
      cy.getByCyLike('boy-list-item')
        .should('have.length', 1)
        .contains(boys[2].description)
    })

    it('should handle delete', () => {
      cy.getByCy('delete-button').first().click()
      cy.get('@handleDeleteBoy').should('have.been.called')
    })

    it('should handle edit', () => {
      cy.getByCy('edit-button').first().click()
      cy.location('pathname').should('eq', '/boys/edit-boy/' + boys[0].id)
    })
  })
})
