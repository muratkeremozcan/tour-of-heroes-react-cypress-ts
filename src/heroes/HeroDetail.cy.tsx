import HeroDetail, {Hero} from './HeroDetail'
import '../styles.scss'
import React from 'react'
import {BrowserRouter} from 'react-router-dom'

describe('HeroDetail', () => {
  context('handleSave, handleCancel', () => {
    let hero: Hero
    beforeEach(() => {
      cy.window()
        .its('console')
        .then(console => cy.spy(console, 'log').as('log'))

      hero = {id: '', name: '', description: ''}
      cy.mount(
        <BrowserRouter>
          <HeroDetail hero={hero} />
        </BrowserRouter>,
      )
    })
    it('should handle Save', () => {
      cy.getByCy('save-button').click()
      cy.get('@log').should('have.been.calledWith', 'handleSave')
    })

    it('should handle Cancel', () => {
      cy.getByCy('cancel-button').click()
      cy.location('pathname').should('eq', '/heroes')
    })
  })

  context('handleNameChange, handleDescriptionChange', () => {
    let hero: Hero
    beforeEach(() => {
      cy.spy(React, 'useState').as('useState')

      hero = {id: '', name: '', description: ''}
      cy.mount(
        <BrowserRouter>
          <HeroDetail hero={hero} />
        </BrowserRouter>,
      )
    })

    it('should handle name change', () => {
      const newHeroName = 'abc'
      cy.getByCy('input-detail-name').type(newHeroName)
      cy.get('@useState')
        .should('have.been.calledWith', hero)
        .its('returnValues')
        .its(newHeroName.length + 1)
        .its(0)
        .should('deep.eq', {...hero, name: newHeroName})
    })

    it('should handle description change', () => {
      const newHeroDescription = '123'
      cy.getByCy('input-detail-description').type(newHeroDescription)
      cy.get('@useState')
        .should('have.been.calledWith', hero)
        .its('returnValues')
        .its(newHeroDescription.length + 1)
        .its(0)
        .should('deep.eq', {...hero, description: newHeroDescription})
    })
  })

  context('state: should verify the layout of the component', () => {
    const shouldNotRenderName = () =>
      cy.get('p').then($el => cy.wrap($el.text()).should('equal', ''))

    const shouldNotRenderId = () => {
      cy.getByCyLike('input-detail').should('have.length', 2)
      cy.getByCy('input-detail-id').should('not.exist')
    }

    const shouldRenderName = (hero: Hero) => {
      cy.contains('p', hero.name)
      cy.findByDisplayValue(hero.name)
    }

    const shouldRenderId = (hero: Hero) => {
      cy.findByDisplayValue(hero.id)
      cy.getByCyLike('input-detail').should('have.length', 3)
    }

    it('id: false, name: false - should verify the minimal state of the component', () => {
      const hero = {id: '', name: '', description: ''}
      cy.mount(
        <BrowserRouter>
          <HeroDetail hero={hero} />
        </BrowserRouter>,
      )

      shouldNotRenderName()
      shouldNotRenderId()

      cy.findByPlaceholderText('e.g. Colleen')
      cy.findByPlaceholderText('e.g. dance fight!')

      cy.getByCy('save-button').should('be.visible')
      cy.getByCy('cancel-button').should('be.visible')
    })

    it('id: false, name: true - should display hero title and field name, and not display id field', () => {
      const hero = {id: '', name: 'Aslaug', description: ''}
      cy.mount(
        <BrowserRouter>
          <HeroDetail hero={hero} />
        </BrowserRouter>,
      )

      shouldRenderName(hero)
      shouldNotRenderId()
    })

    it('id: true, name: false - should not display hero name, and display all fields', () => {
      const hero = {id: 'HeroAslaug', name: '', description: ''}
      cy.mount(
        <BrowserRouter>
          <HeroDetail hero={hero} />
        </BrowserRouter>,
      )

      shouldNotRenderName()
      shouldRenderId(hero)
    })

    it('id: true, name: true - should display hero name, id  ', () => {
      const hero = {id: 'HeroAslaug', name: 'Aslaug', description: ''}
      cy.mount(
        <BrowserRouter>
          <HeroDetail hero={hero} />
        </BrowserRouter>,
      )

      shouldRenderName(hero)
      shouldRenderId(hero)

      cy.getByCy('input-detail-description').type('hero description')
      cy.findByDisplayValue('hero description')
    })
  })
})
