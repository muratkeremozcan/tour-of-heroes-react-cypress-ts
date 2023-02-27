import ButtonFooter from './ButtonFooter'
import {FaEdit} from 'react-icons/fa'
import {heavy} from '@cypress/support/heavy-import' // compiles TS, does not work with cy CT

describe('ButtonFooter', () => {
  it('should render and Edit button, the label, and trigger an onClick', () => {
    cy.mount(
      <ButtonFooter
        label={'Edit'}
        IconClass={FaEdit}
        onClick={cy.stub().as('click')}
      />,
    )

    cy.log(heavy())
  })
})
