// put e2e + CT common commands here
// import '@testing-library/cypress/add-commands' // better to import plugins where relevant, speeds up test warmup
import '@bahmutov/cypress-code-coverage/support'

Cypress.Commands.add('getByCy', (selector, ...args) =>
  cy.get(`[data-cy="${selector}"]`, ...args),
)

Cypress.Commands.add('getByCyLike', (selector, ...args) =>
  cy.get(`[data-cy*=${selector}]`, ...args),
)

Cypress.Commands.add('getByClassLike', (selector, ...args) =>
  cy.get(`[class*=${selector}]`, ...args),
)
