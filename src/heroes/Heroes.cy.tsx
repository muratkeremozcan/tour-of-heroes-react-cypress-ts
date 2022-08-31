import Heroes from './Heroes'
import {BrowserRouter} from 'react-router-dom'
import '../styles.scss'

describe('Heroes', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:4000/api/heroes', {
      fixture: 'heroes.json',
    }).as('getHeroes')
  })

  it('should display the hero list on render, and go through hero add & refresh flow', () => {
    cy.mount(
      <BrowserRouter>
        <Heroes />
      </BrowserRouter>,
    )

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
    cy.window()
      .its('console')
      .then(console => cy.spy(console, 'log').as('log'))

    cy.mount(
      <BrowserRouter>
        <Heroes />
      </BrowserRouter>,
    )

    cy.getByCy('modal-yes-no').should('not.exist')

    cy.log('do not delete flow')
    invokeHeroDelete()
    cy.getByCy('button-no').click()
    cy.getByCy('modal-yes-no').should('not.exist')

    cy.log('delete flow')
    invokeHeroDelete()
    cy.getByCy('button-yes').click()
    cy.getByCy('modal-yes-no').should('not.exist')
    cy.get('@log').should('have.been.calledWith', 'handleDeleteFromModal')
  })
})
