import InputDetail from './InputDetail'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('InputDetail', () => {
  const placeholder = 'Aslaug'
  const name = 'name'
  const value = 'some value'
  const newValue = '42'

  it('should allow the input field to be modified', async () => {
    const onChange = jest.fn()
    render(
      <InputDetail
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />,
    )

    await screen.findByText(name)
    const inputField = await screen.findByPlaceholderText(placeholder)
    await userEvent.clear(inputField)
    await userEvent.type(inputField, newValue)
    expect(inputField).toHaveDisplayValue(newValue)
    expect(onChange).toHaveBeenCalledTimes(newValue.length)
  })

  it('should not allow the input field to be modified', async () => {
    render(
      <InputDetail
        name={name}
        value={value}
        placeholder={placeholder}
        readOnly={true}
      />,
    )

    await screen.findByText(name)
    const inputField = await screen.findByPlaceholderText(placeholder)
    expect(inputField).toHaveDisplayValue(value)
    expect(inputField).toHaveAttribute('readOnly')
  })
})
