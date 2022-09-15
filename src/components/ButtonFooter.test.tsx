import ButtonFooter from './ButtonFooter'
import {FaEdit, FaRegSave} from 'react-icons/fa'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('ButtonFooter', () => {
  const click = jest.fn()

  const doAssertions = async (label: string) => {
    expect(await screen.findByText(label)).toBeVisible()

    await userEvent.click(
      await screen.findByTestId(`${label.toLowerCase()}-button`),
    )
    expect(click).toHaveBeenCalled()
  }

  it('should render and Edit button, the label, and trigger an onClick', async () => {
    const label = 'Edit'
    render(<ButtonFooter label={label} IconClass={FaEdit} onClick={click} />)

    await doAssertions(label)
  })

  it('should render and Save button, the label, and trigger an onClick', async () => {
    const label = 'Save'
    render(<ButtonFooter label={label} IconClass={FaRegSave} onClick={click} />)

    await doAssertions(label)
  })
})
