import VillainList from './VillainList'

import villains from '../../cypress/fixtures/villains.json'
import VillainsContext from 'hooks/useVillainsContext'

describe('VillainList', () => {
  it('no villains should not display a list nor search bar', () => {
    cy.wrappedMount(
      <VillainList handleDeleteVillain={cy.stub().as('handleDeleteVillain')} />,
    )

    cy.getByCy('villain-list').should('exist')
    cy.getByCyLike('villain-list-item').should('not.exist')
    cy.getByCy('search').should('not.exist')
  })

  context('with villains in the list', () => {
    beforeEach(() => {
      cy.wrappedMount(
        <VillainsContext.Provider value={villains}>
          <VillainList
            handleDeleteVillain={cy.stub().as('handleDeleteVillain')}
          />
        </VillainsContext.Provider>,
      )
    })

    it('should render the villain layout', () => {
      cy.getByCyLike('villain-list-item').should('have.length', villains.length)

      cy.getByCy('card-content')
      cy.contains(villains[0].name)
      cy.contains(villains[0].description)

      cy.get('footer')
        .first()
        .within(() => {
          cy.getByCy('delete-button')
          cy.getByCy('edit-button')
        })
    })

    it('should search and filter villain by name and description', () => {
      cy.getByCy('search').type(villains[0].name)
      cy.getByCyLike('villain-list-item')
        .should('have.length', 1)
        .contains(villains[0].name)

      cy.getByCy('search').clear().type(villains[2].description)
      cy.getByCyLike('villain-list-item')
        .should('have.length', 1)
        .contains(villains[2].description)
    })

    it('should handle delete', () => {
      cy.getByCy('delete-button').first().click()
      cy.get('@handleDeleteVillain').should('have.been.called')
    })

    it('should handle edit', () => {
      cy.getByCy('edit-button').first().click()
      cy.location('pathname').should(
        'eq',
        '/villains/edit-villain/' + villains[0].id,
      )
    })
  })
})
