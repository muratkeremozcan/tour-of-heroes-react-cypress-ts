import {faker} from '@faker-js/faker'
import {Hero} from '../../../src/models/Hero'

describe('Backend e2e', () => {
  const assertProperties = (entity: Hero) => {
    expect(entity.id).to.be.a('string')
    expect(entity.name).to.be.a('string')
    expect(entity.description).to.be.a('string')
  }

  before(() => cy.resetData())

  it('should GET heroes and villains ', () => {
    cy.crud('GET', 'heroes')
      .its('body')
      .should('have.length.gt', 0)
      .each(assertProperties)

    cy.crud('GET', 'villains')
      .its('body')
      .should('have.length.gt', 0)
      .each(assertProperties)
  })

  it('should CRUD a new hero entity', () => {
    const newHero = {
      id: faker.datatype.uuid(),
      name: faker.internet.userName(),
      description: `description ${faker.internet.userName()}`,
    }

    cy.crud('POST', 'heroes', {body: newHero})

    cy.crud('GET', 'heroes')
      .its('body')
      .then(body => {
        expect(body.at(-1)).to.deep.eq(newHero)
      })

    const editedHero = {...newHero, name: 'Murat'}
    cy.crud('PUT', `heroes/${editedHero.id}`, {body: editedHero})
    cy.crud('GET', `heroes/${editedHero.id}`)
      .its('body')
      .should('deep.eq', editedHero)

    cy.crud('DELETE', `heroes/${editedHero.id}`)
    cy.crud('GET', `heroes/${editedHero.id}`, {allowedToFail: true})
      .its('status')
      .should('eq', 404)
  })

  it('should CRUD a new villain entity', () => {
    const newVillain = {
      id: faker.datatype.uuid(),
      name: faker.internet.userName(),
      description: `description ${faker.internet.userName()}`,
    }

    cy.crud('POST', 'villains', {body: newVillain})

    cy.crud('GET', 'villains')
      .its('body')
      .then(body => {
        expect(body.at(-1)).to.deep.eq(newVillain)
      })

    const editedVillain = {...newVillain, name: 'Murat'}
    cy.crud('PUT', `villains/${editedVillain.id}`, {body: editedVillain})
    cy.crud('GET', `villains/${editedVillain.id}`)
      .its('body')
      .should('deep.eq', editedVillain)

    cy.crud('DELETE', `villains/${editedVillain.id}`)
    cy.crud('GET', `villains/${editedVillain.id}`, {allowedToFail: true})
      .its('status')
      .should('eq', 404)
  })
})
