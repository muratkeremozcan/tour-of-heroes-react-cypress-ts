import ButtonFooter from './ButtonFooter'
import {EditAlt, Save} from '@styled-icons/boxicons-regular'
import styled from 'styled-components'

describe('ButtonFooter', () => {
  const doAssertions = (label: string) => {
    cy.contains('span', label)
    cy.getByClassLike('StyledIconBase').should('be.visible')

    cy.getByCy(`${label}-button`).click()
    cy.get('@click').should('be.called')
  }

  it('should render and Edit button, the label, and trigger an onClick', () => {
    const label = 'Edit'
    cy.mount(
      <ButtonFooter
        label={label}
        IconClass={EditAlt}
        onClick={cy.stub().as('click')}
      />,
    )

    doAssertions(label)
  })

  it('should render a green Save button, the label, and trigger an onClick', () => {
    const GreenSave = styled(Save)`
      color: green;
    `
    const label = 'Save'

    cy.mount(
      <ButtonFooter
        label={label}
        IconClass={GreenSave}
        onClick={cy.stub().as('click')}
      />,
    )

    doAssertions(label)
    cy.getByClassLike('StyledIconBase').should(
      'have.css',
      'color',
      'rgb(0, 128, 0)',
    )
  })
})
