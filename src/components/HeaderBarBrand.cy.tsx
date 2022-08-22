import HeaderBarBrand from './HeaderBarBrand'
import {BrowserRouter} from 'react-router-dom'
import '../styles.scss'

describe('HeaderBarBrand', () => {
  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <HeaderBarBrand />
      </BrowserRouter>,
    )
  })

  it('should verify external link attributes', () => {
    cy.get('a')
      .should('have.attr', 'href', 'https://reactjs.org/')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer')
    cy.getByCy('header-bar-brand').within(() => cy.get('svg'))
  })

  it('should verify internal link spans and navigation', () => {
    cy.getByCy('navLink').within(() =>
      cy
        .wrap(['TOUR', 'OF', 'HEROES'])
        .each((part: string) => cy.contains('span', part)),
    )
    cy.getByCy('navLink').click()
    cy.url().should('contain', '/')
  })
})
