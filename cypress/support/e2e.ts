// put e2e only commands and plugins here

import './commands'
import {Villain} from './../../src/models/Villain'
import {Hero} from '../../src/models/Hero'
import {Boy} from '../../src/models/Boy'
import {
  entityRoute,
  EntityRoute,
  EntityType,
  HeroProperty,
  VillainProperty,
  BoyProperty,
} from '../../src/models/types'
import data from '../fixtures/db.json'

Cypress.Commands.add(
  'crud',
  (
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    route: string,
    {
      body,
      allowedToFail = false,
    }: {body?: Hero | Villain | Boy | object; allowedToFail?: boolean} = {},
  ) =>
    cy.request<(Hero[] & Hero) | (Villain[] & Villain) | (Boy[] & Boy)>({
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
  (property: HeroProperty | VillainProperty | BoyProperty) =>
  (entity: Hero | Villain | Boy) =>
    entity.name === property ||
    entity.description === property ||
    entity.id === property

const getEntities = (entityRoute: EntityRoute) =>
  cy.crud('GET', entityRoute).its('body')

Cypress.Commands.add(
  'getEntityByProperty',
  (
    entityType: EntityType,
    property: HeroProperty | VillainProperty | BoyProperty,
  ) =>
    getEntities(entityRoute(entityType)).then(entities =>
      _.find(entities, propExists(property)),
    ),
)

Cypress.Commands.add(
  'findEntityIndex',
  (
    entityType: EntityType,
    property: HeroProperty | VillainProperty | BoyProperty,
  ) =>
    getEntities(entityRoute(entityType)).then(
      (body: Hero[] | Villain[] | Boy[]) => ({
        entityIndex: _.findIndex(body, propExists(property)),
        entityArray: body,
      }),
    ),
)

Cypress.Commands.add('visitStubbedEntities', (entityRoute: EntityRoute) => {
  cy.intercept('GET', `${Cypress.env('API_URL')}/${entityRoute}`, {
    fixture: `${entityRoute}.json`,
  }).as(`stubbed${_.startCase(entityRoute)}`)
  cy.visit(`/${entityRoute}`)
  cy.wait(`@stubbed${_.startCase(entityRoute)}`)
  return cy.location('pathname').should('eq', `/${entityRoute}`)
})

Cypress.Commands.add('visitEntities', (entityRoute: EntityRoute) => {
  cy.intercept('GET', `${Cypress.env('API_URL')}/${entityRoute}`).as(
    `get${_.startCase(entityRoute)}`,
  )
  cy.visit(`/${entityRoute}`)
  cy.wait(`@get${_.startCase(entityRoute)}`)
  return cy.location('pathname').should('eq', `/${entityRoute}`)
})
