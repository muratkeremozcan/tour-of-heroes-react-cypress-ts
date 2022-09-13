import NavBar from './NavBar'
import '../styles.scss'

describe('NavBar', () => {
  it('should navigate to the correct routes', () => {
    cy.wrappedMount(<NavBar />)

    cy.getByCy('nav-bar').within(() => {
      cy.contains('p', 'Menu')

      const routes = ['heroes', 'villains', 'about']
      cy.getByCy('menu-list').children().should('have.length', routes.length)

      cy.wrap(routes).each((route: string) => {
        cy.get(`[href="/${route}"]`)
          .contains(route, {matchCase: false})
          .click()
          .should('have.class', 'active-link')
          .siblings()
          .should('not.have.class', 'active-link')

        cy.url().should('contain', route)
      })
    })
  })
})
