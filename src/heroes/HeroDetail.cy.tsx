import HeroDetail from './HeroDetail'
import '../styles.scss'

describe('HeroDetail', () => {
  it('should handle Save', () => {
    const hero = {id: '', name: '', description: ''}
    cy.mount(<HeroDetail hero={hero} />)
    cy.window()
      .its('console')
      .then(console => cy.spy(console, 'log').as('log'))

    cy.getByCy('save-button').click()
    cy.get('@log').should('have.been.calledWith', 'handleSave')
  })

  it('should handle Cancel', () => {
    const hero = {id: '', name: '', description: ''}
    cy.mount(<HeroDetail hero={hero} />)
    cy.window()
      .its('console')
      .then(console => cy.spy(console, 'log').as('log'))

    cy.getByCy('cancel-button').click()

    cy.get('@log').should('have.been.calledWith', 'handleCancel')
  })

  it('should handle name change', () => {
    const hero = {id: '', name: '', description: ''}
    cy.mount(<HeroDetail hero={hero} />)
    cy.window()
      .its('console')
      .then(console => cy.spy(console, 'log').as('log'))

    cy.getByCy('input-detail-name').type('abc')
    cy.get('@log').should('have.been.calledWith', 'handleNameChange')
    cy.get('@log').its('callCount').should('eq', 3)
  })

  it('should handle description change', () => {
    const hero = {id: '', name: '', description: ''}
    cy.mount(<HeroDetail hero={hero} />)
    cy.window()
      .its('console')
      .then(console => cy.spy(console, 'log').as('log'))

    cy.getByCy('input-detail-description').type('123')
    cy.get('@log').should('have.been.calledWith', 'handleDescriptionChange')
    cy.get('@log').its('callCount').should('eq', 3)
  })

  context('state: should verify the layout of the component', () => {
    it('id: false, name: false ', () => {
      const hero = {id: '', name: '', description: ''}
      cy.mount(<HeroDetail hero={hero} />)

      cy.getByCy('hero-detail')
      cy.getByCyLike('input-detail').should('have.length', 2)

      cy.findByPlaceholderText('e.g. Colleen')
      cy.findByPlaceholderText('e.g. dance fight!')

      cy.getByCy('save-button').should('be.visible')
      cy.getByCy('cancel-button').should('be.visible')
    })

    it('id: false, name: true - should display hero title and field name, and not display id field', () => {
      const hero = {id: '', name: 'Aslaug', description: ''}
      cy.mount(<HeroDetail hero={hero} />)

      cy.contains('p', hero.name)
      cy.findByDisplayValue(hero.name)

      cy.getByCyLike('input-detail').should('have.length', 2)
      cy.getByCy('input-detail-id').should('not.exist')
    })

    it('id: true, name: false - should not display hero name, and display all fields', () => {
      const hero = {id: 'HeroAslaug', name: '', description: ''}
      cy.mount(<HeroDetail hero={hero} />)

      cy.get('p').then($el => cy.wrap($el.text()).should('equal', ''))

      cy.findByDisplayValue(hero.id)
      cy.getByCyLike('input-detail').should('have.length', 3)
    })

    it('id: true, name: true - should display hero name, id  ', () => {
      const hero = {id: 'HeroAslaug', name: 'Aslaug', description: ''}
      cy.mount(<HeroDetail hero={hero} />)

      cy.contains('p', hero.name)
      cy.findByDisplayValue(hero.name)
      cy.findByDisplayValue(hero.id)

      cy.getByCyLike('input-detail').should('have.length', 3)

      cy.getByCy('input-detail-description').type('hero description')
      cy.findByDisplayValue('hero description')
    })
  })
})
