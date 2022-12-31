import ButtonFooter from './ButtonFooter'
import {FaEdit, FaRegSave} from 'react-icons/fa'

describe('ButtonFooter', () => {
  const doAssertions = (label: string) => {
    cy.contains('span', label)
    cy.get('svg').should('be.visible')

    cy.getByCy(`${label.toLowerCase()}-button`).click()
    cy.get('@click').should('be.called')
  }

  it('should render and Edit button, the label, and trigger an onClick', () => {
    const label = 'Edit'
    cy.mount(
      <ButtonFooter
        label={label}
        IconClass={FaEdit}
        onClick={cy.stub().as('click')}
      />,
    )

    doAssertions(label)
  })

  it('should render and Save button, the label, and trigger an onClick', () => {
    const label = 'Save'
    cy.mount(
      <ButtonFooter
        label={label}
        IconClass={FaRegSave}
        onClick={cy.stub().as('click')}
      />,
    )

    doAssertions(label)
  })
})
