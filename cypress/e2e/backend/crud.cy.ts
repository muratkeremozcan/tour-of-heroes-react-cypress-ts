import {faker} from '@faker-js/faker'
import {Hero} from '../../../src/models/Hero'
import {Villain} from '../../../src/models/Villain'
import {Boy} from '../../../src/models/Boy'

describe('Backend e2e', () => {
  const assertProperties = (entity: Hero | Villain | Boy) => {
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

    cy.crud('POST', 'heroes', {body: newHero}).its('status').should('eq', 201)

    cy.crud('GET', 'heroes')
      .its('body')
      .then(body => {
        expect(body.at(-1)).to.deep.eq(newHero)
      })

    const editedHero = {...newHero, name: 'Murat'}
    cy.crud('PUT', `heroes/${editedHero.id}`, {body: editedHero})
      .its('status')
      .should('eq', 200)
    cy.crud('GET', `heroes/${editedHero.id}`)
      .its('body')
      .should('deep.eq', editedHero)

    cy.crud('DELETE', `heroes/${editedHero.id}`).its('status').should('eq', 200)
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
      .its('status')
      .should('eq', 201)

    cy.crud('GET', 'villains')
      .its('body')
      .then(body => {
        expect(body.at(-1)).to.deep.eq(newVillain)
      })

    const editedVillain = {...newVillain, name: 'Murat'}
    cy.crud('PUT', `villains/${editedVillain.id}`, {body: editedVillain})
      .its('status')
      .should('eq', 200)
    cy.crud('GET', `villains/${editedVillain.id}`)
      .its('body')
      .should('deep.eq', editedVillain)

    cy.crud('DELETE', `villains/${editedVillain.id}`)
      .its('status')
      .should('eq', 200)
    cy.crud('GET', `villains/${editedVillain.id}`, {allowedToFail: true})
      .its('status')
      .should('eq', 404)
  })

  it('should CRUD a new boy entity', () => {
    const newVillain = {
      id: faker.datatype.uuid(),
      name: faker.internet.userName(),
      description: `description ${faker.internet.userName()}`,
    }

    cy.crud('POST', 'boys', {body: newVillain}).its('status').should('eq', 201)

    cy.crud('GET', 'boys')
      .its('body')
      .then(body => {
        expect(body.at(-1)).to.deep.eq(newVillain)
      })

    const editedVillain = {...newVillain, name: 'Murat'}
    cy.crud('PUT', `boys/${editedVillain.id}`, {body: editedVillain})
      .its('status')
      .should('eq', 200)
    cy.crud('GET', `boys/${editedVillain.id}`)
      .its('body')
      .should('deep.eq', editedVillain)

    cy.crud('DELETE', `boys/${editedVillain.id}`)
      .its('status')
      .should('eq', 200)
    cy.crud('GET', `boys/${editedVillain.id}`, {allowedToFail: true})
      .its('status')
      .should('eq', 404)
  })
})
