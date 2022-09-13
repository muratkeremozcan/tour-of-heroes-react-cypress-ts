import ListHeader from './ListHeader'
import '../styles.scss'

describe('ListHeader', () => {
  it('should call click handlers on add & refresh button clicks', () => {
    const title = 'Heroes'
    cy.wrappedMount(
      <ListHeader
        title={title}
        handleAdd={cy.stub().as('handleAdd')}
        handleRefresh={cy.stub().as('handleRefresh')}
      />,
    )

    cy.getByCy('add-button').click()
    cy.get('@handleAdd').should('be.called')

    cy.getByCy('refresh-button').click()
    cy.get('@handleRefresh').should('be.called')

    cy.getByCy('title').contains(title).click()
    cy.url().should('contain', title)
  })
})
