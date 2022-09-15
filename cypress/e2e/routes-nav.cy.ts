describe('routes navigation (ui-integration)', () => {
  beforeEach(() => {
    cy.intercept('GET', `${Cypress.env('API_URL')}/heroes`, {
      fixture: 'heroes',
    }).as('stubbedGetHeroes')
  })
  it('should land on baseUrl, redirect to /heroes', () => {
    cy.visit('/')
    cy.getByCy('header-bar').should('be.visible')
    cy.getByCy('nav-bar').should('be.visible')

    cy.url().should('include', '/heroes')
    cy.getByCy('heroes').should('be.visible')
  })

  it('should direct-navigate to /heroes', () => {
    const route = '/heroes'
    cy.visit(route)
    cy.url().should('include', route)
    cy.getByCy('heroes').should('be.visible')
  })

  it('should direct-navigate to /villains', () => {
    const route = '/villains'
    cy.visit(route)
    cy.url().should('include', route)
    cy.getByCy('villains').should('be.visible')
  })

  it('should land on not found when visiting an non-existing route', () => {
    const route = '/route48'
    cy.visit(route)
    cy.url().should('include', route)
    cy.getByCy('not-found').should('be.visible')
  })

  it('should direct-navigate to about', () => {
    const route = '/about'
    cy.visit(route)
    cy.url().should('include', route)
    cy.getByCy('about').contains('CCTDD')
  })

  it('should cover route history with browser back and forward', () => {
    cy.visit('/about')
    const routes = ['villains', 'heroes', 'about']
    cy.wrap(routes).each((route: string) =>
      cy.get(`[href="/${route}"]`).click(),
    )

    const lastIndex = routes.length - 1
    cy.url().should('include', routes[lastIndex])
    cy.go('back')
    cy.url().should('include', routes[lastIndex - 1])
    cy.go('back')
    cy.url().should('include', routes[lastIndex - 2])
    cy.go('forward').go('forward')
    cy.url().should('include', routes[lastIndex])
  })
})
