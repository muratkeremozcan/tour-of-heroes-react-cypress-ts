import Heroes from './Heroes'
import {BrowserRouter} from 'react-router-dom'
import '../styles.scss'

describe('Heroes', () => {
  it('should handle hero add and refresh', () => {
    cy.window()
      .its('console')
      .then(console => cy.spy(console, 'log').as('log'))

    cy.mount(
      <BrowserRouter>
        <Heroes />
      </BrowserRouter>,
    )

    cy.getByCy('list-header')
    cy.getByCy('add-button').click()
    cy.get('@log').should('have.been.calledWith', 'handleAdd')
    cy.getByCy('refresh-button').click()
    cy.get('@log').should('have.been.calledWith', 'handleRefresh')
  })

  it('should display hero list on render', () => {
    cy.mount(
      <BrowserRouter>
        <Heroes />
      </BrowserRouter>,
    )

    cy.getByCy('hero-list')
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
