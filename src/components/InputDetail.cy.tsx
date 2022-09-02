import InputDetail from './InputDetail'
import '../styles.scss'

describe('InputDetail', () => {
  it('should allow the input field to be modified', () => {
    const placeholder = 'Aslaug'
    const name = 'name'
    const value = 'some value'
    const newValue = '42'
    cy.mount(
      <InputDetail
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={cy.stub().as('onChange')}
      />,
    )

    cy.contains('label', name)
    cy.findByPlaceholderText(placeholder).clear().type(newValue)
    cy.get('input').should('have.value', newValue)
    cy.get('@onChange').should('have.been.calledTwice')
  })

  it('should not allow the input field to be modified', () => {
    const placeholder = 'Aslaug'
    const name = 'name'
    const value = 'some value'
    cy.mount(
      <InputDetail
        name={name}
        value={value}
        placeholder={placeholder}
        readOnly={true}
      />,
    )

    cy.contains('label', name)
    cy.findByPlaceholderText(placeholder).should('have.attr', 'readOnly')
    cy.get('input').should('have.value', value)
  })
})
