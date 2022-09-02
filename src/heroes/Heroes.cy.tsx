import Heroes from './Heroes'
import {BrowserRouter} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'
import '../styles.scss'

describe('Heroes', () => {
  let queryClient: QueryClient
  beforeEach(() => {
    cy.intercept('GET', `${Cypress.env('API_URL')}/heroes`, {
      fixture: 'heroes.json',
    }).as('getHeroes')

    queryClient = new QueryClient()
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Heroes />
        </BrowserRouter>
      </QueryClientProvider>,
    )
  })

  it('should display the hero list on render, and go through hero add & refresh flow', () => {
    cy.wait('@getHeroes')

    cy.getByCy('list-header').should('be.visible')
    cy.getByCy('hero-list').should('be.visible')

    cy.getByCy('add-button').click()
    cy.location('pathname').should('eq', '/heroes/add-hero')

    cy.getByCy('refresh-button').click()
    cy.location('pathname').should('eq', '/heroes')
  })

  const invokeHeroDelete = () => {
    cy.getByCy('delete-button').first().click()
    cy.getByCy('modal-yes-no').should('be.visible')
  }
  it('should go through the modal flow', () => {
    cy.getByCy('modal-yes-no').should('not.exist')

    cy.log('do not delete flow')
    invokeHeroDelete()
    cy.getByCy('button-no').click()
    cy.getByCy('modal-yes-no').should('not.exist')

    cy.log('delete flow')
    invokeHeroDelete()
    cy.intercept('DELETE', '*', {statusCode: 200}).as('deleteHero')

    cy.getByCy('button-yes').click()
    cy.wait('@deleteHero')
    cy.getByCy('modal-yes-no').should('not.exist')
  })
})
