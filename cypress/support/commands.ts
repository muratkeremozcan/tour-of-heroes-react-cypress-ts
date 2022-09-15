import {Villain} from './../../src/models/Villain'
import {Hero} from '../../src/models/Hero'
import {HeroProperty, VillainProperty} from '../../src/models/types'
import data from '../fixtures/db.json'

Cypress.Commands.add('getByCy', (selector, ...args) =>
  cy.get(`[data-cy="${selector}"]`, ...args),
)

Cypress.Commands.add('getByCyLike', (selector, ...args) =>
  cy.get(`[data-cy*=${selector}]`, ...args),
)

Cypress.Commands.add('getByClassLike', (selector, ...args) =>
  cy.get(`[class*=${selector}]`, ...args),
)

Cypress.Commands.add(
  'crud',
  (
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    route: string,
    {
      body,
      allowedToFail = false,
    }: {body?: Hero | object; allowedToFail?: boolean} = {},
  ) =>
    cy.request<Hero[] & Hero>({
      method: method,
      url: `${Cypress.env('API_URL')}/${route}`,
      body: method === 'POST' || method === 'PUT' ? body : undefined,
      retryOnStatusCodeFailure: !allowedToFail,
      failOnStatusCode: !allowedToFail,
    }),
)

Cypress.Commands.add('resetData', () => cy.crud('POST', 'reset', {body: data}))

const {_} = Cypress

const propExists =
  (property: HeroProperty | VillainProperty) => (entity: Hero | Villain) =>
    entity.name === property ||
    entity.description === property ||
    entity.id === property

const getHeroes = () => cy.crud('GET', 'heroes').its('body')
const getVillains = () => cy.crud('GET', 'villains').its('body')

Cypress.Commands.add('getHeroByProperty', (property: HeroProperty) =>
  getHeroes()
    .then((body: Hero[]) => _.filter(body, propExists(property)))
    .its(0),
)

Cypress.Commands.add('getVillainByProperty', (property: VillainProperty) =>
  getVillains()
    .then((body: Villain[]) => _.filter(body, propExists(property)))
    .its(0),
)

Cypress.Commands.add('findHeroIndex', (property: HeroProperty) =>
  getHeroes().then((body: Hero[]) => ({
    heroIndex: _.findIndex(body, propExists(property)),
    heroesArray: body,
  })),
)

Cypress.Commands.add('findVillainIndex', (property: VillainProperty) =>
  getVillains().then((body: Villain[]) => ({
    villainIndex: _.findIndex(body, propExists(property)),
    villainsArray: body,
  })),
)

Cypress.Commands.add('visitStubbedHeroes', () => {
  cy.intercept('GET', `${Cypress.env('API_URL')}/heroes`, {
    fixture: 'heroes',
  }).as('stubbedGetHeroes')
  cy.visit('/')
  cy.wait('@stubbedGetHeroes')
  return cy.location('pathname').should('eq', '/heroes')
})

Cypress.Commands.add('visitStubbedVillains', () => {
  cy.intercept('GET', `${Cypress.env('API_URL')}/villains`, {
    fixture: 'villains',
  }).as('stubbedGetVillains')
  cy.visit('/villains')
  cy.wait('@stubbedGetVillains')
  return cy.location('pathname').should('eq', '/villains')
})

Cypress.Commands.add('visitHeroes', () => {
  cy.intercept('GET', `${Cypress.env('API_URL')}/heroes`).as('getHeroes')
  cy.visit('/')
  cy.wait('@getHeroes')
  return cy.location('pathname').should('eq', '/heroes')
})

Cypress.Commands.add('visitVillains', () => {
  cy.intercept('GET', `${Cypress.env('API_URL')}/villains`).as('getVillains')
  cy.visit('/villains')
  cy.wait('@getVillains')
  return cy.location('pathname').should('eq', '/villains')
})
