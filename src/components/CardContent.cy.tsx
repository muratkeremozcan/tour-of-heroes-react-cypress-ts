import CardContent from './CardContent'
import '../styles.css'

describe('CardContent', () => {
  it('should', () => {
    const name = 'Bjorn Ironside'
    const description = 'king of 9th century Sweden'
    cy.mount(<CardContent name={name} description={description} />)

    cy.contains('div', name)
    cy.contains('div', description)
  })
})
