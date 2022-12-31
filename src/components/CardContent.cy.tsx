import CardContent from './CardContent'

describe('CardContent', () => {
  it('should render the card content', () => {
    const name = 'Bjorn Ironside'
    const description = 'king of 9th century Sweden'
    cy.mount(<CardContent name={name} description={description} />)

    cy.contains('div', name)
    cy.contains('div', description)
  })
})
