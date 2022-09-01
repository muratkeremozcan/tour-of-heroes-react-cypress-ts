import '@testing-library/cypress/add-commands'
import {Hero} from '../../src/models/Hero'
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
Cypress.Commands.add('getEntityByName', (name: Hero['name']) =>
  cy
    .crud('GET', 'heroes')
    .its('body')
    .then((body: Hero[]) => _.filter(body, (hero: Hero) => hero.name === name))
    .its(0),
)
