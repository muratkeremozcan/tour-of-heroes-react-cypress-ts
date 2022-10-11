import NavBar from './NavBar'
import {BrowserRouter} from 'react-router-dom'
import '../styles.scss'

describe('NavBar', () => {
  it('should navigate to the correct routes', () => {
    cy.mount(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    )

    cy.getByCy('nav-bar').within(() => {
      cy.contains('p', 'Menu')

      const routes = ['heroes', 'villains', 'boys', 'about']
      cy.getByCy('menu-list').children().should('have.length', routes.length)

      routes.forEach((route: string) => {
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
