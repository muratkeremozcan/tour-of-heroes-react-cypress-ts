import {Villain} from './../../src/models/Villain'
import {Hero} from '../../src/models/Hero'
import {
  EntityRoute,
  EntityType,
  HeroProperty,
  VillainProperty,
} from '../../src/models/types'
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

const getEntities = (entityRoute: EntityRoute) =>
  cy.crud('GET', entityRoute).its('body')

Cypress.Commands.add(
  'getEntityByProperty',
  (entityType: EntityType, property: HeroProperty | VillainProperty) =>
    getEntities(entityType === 'hero' ? 'heroes' : 'villains').then(entities =>
      _.find(entities, propExists(property)),
    ),
)

Cypress.Commands.add(
  'findEntityIndex',
  (entityType: EntityType, property: HeroProperty | VillainProperty) =>
    getEntities(entityType === 'hero' ? 'heroes' : 'villains').then(
      (body: Hero[]) => ({
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
