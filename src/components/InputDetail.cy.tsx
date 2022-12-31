import InputDetail from './InputDetail'

import '@testing-library/cypress/add-commands'

describe('InputDetail', () => {
  const placeholder = 'Aslaug'
  const name = 'name'
  const value = 'some value'
  const newValue = '42'

  it('should allow the input field to be modified', () => {
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
    cy.findByDisplayValue(newValue).should('be.visible')
    cy.get('@onChange').its('callCount').should('eq', newValue.length)
  })

  it('should not allow the input field to be modified', () => {
    cy.mount(
      <InputDetail
        name={name}
        value={value}
        placeholder={placeholder}
        readOnly={true}
      />,
    )

    cy.contains('label', name)
    cy.findByPlaceholderText(placeholder)
      .should('have.value', value)
      .and('have.attr', 'readOnly')
  })
})
