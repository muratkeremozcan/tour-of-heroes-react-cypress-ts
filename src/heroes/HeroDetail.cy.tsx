import HeroDetail from './HeroDetail'
import '../styles.scss'
import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'

describe('HeroDetail', () => {
  let queryClient: QueryClient
  context('handleSave, handleCancel', () => {
    beforeEach(() => {
      queryClient = new QueryClient()
      cy.mount(
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <HeroDetail />
          </BrowserRouter>
        </QueryClientProvider>,
      )
    })
    it('should handle Save', () => {
      cy.intercept('POST', '*', {statusCode: 200}).as('postHero')
      cy.getByCy('save-button').click()
      cy.wait('@postHero')
    })

    it('should handle Cancel', () => {
      cy.getByCy('cancel-button').click()
      cy.location('pathname').should('eq', '/heroes')
    })
  })

  context('handleNameChange, handleDescriptionChange', () => {
    beforeEach(() => {
      cy.spy(React, 'useState').as('useState')

      queryClient = new QueryClient()
      cy.mount(
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <HeroDetail />
          </BrowserRouter>
        </QueryClientProvider>,
      )
    })

    it('should handle name change', () => {
      const newHeroName = 'abc'
      cy.getByCy('input-detail-name').type(newHeroName)

      cy.get('@useState').should('have.been.called')
    })

    it('should handle description change', () => {
      const newHeroDescription = '123'
      cy.getByCy('input-detail-description').type(newHeroDescription)
      cy.get('@useState').should('have.been.called')
    })
  })

  context('state: should verify the layout of the component', () => {
    it('id: false, name: false - should verify the minimal state of the component', () => {
      queryClient = new QueryClient()
      cy.mount(
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <HeroDetail />
          </BrowserRouter>
        </QueryClientProvider>,
      )

      cy.get('p').then($el => cy.wrap($el.text()).should('equal', ''))
      cy.getByCyLike('input-detail').should('have.length', 2)
      cy.getByCy('input-detail-id').should('not.exist')

      cy.findByPlaceholderText('e.g. Colleen')
      cy.findByPlaceholderText('e.g. dance fight!')

      cy.getByCy('save-button').should('be.visible')
      cy.getByCy('cancel-button').should('be.visible')
    })
  })
})
