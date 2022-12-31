import ListHeader from './ListHeader'
import {BrowserRouter} from 'react-router-dom'

describe('ListHeader', () => {
  it('should call click handlers on add & refresh button clicks', () => {
    const title = 'Heroes'
    cy.mount(
      <BrowserRouter>
        <ListHeader
          title={title}
          handleAdd={cy.stub().as('handleAdd')}
          handleRefresh={cy.stub().as('handleRefresh')}
        />
      </BrowserRouter>,
    )

    cy.getByCy('add-button').click()
    cy.get('@handleAdd').should('be.called')

    cy.getByCy('refresh-button').click()
    cy.get('@handleRefresh').should('be.called')

    cy.getByCy('title').contains(title).click()
    cy.url().should('contain', title)
  })
})
