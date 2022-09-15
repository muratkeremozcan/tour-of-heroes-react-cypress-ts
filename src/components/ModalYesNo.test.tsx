import ModalYesNo from './ModalYesNo'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('ModalYesNo', () => {
  const message = 'Are you sure?'
  const onYes = jest.fn()
  const onNo = jest.fn()

  it('should render the modal and call onClick handlers', async () => {
    render(<ModalYesNo message={message} onYes={onYes} onNo={onNo} />)

    await screen.findByText('Confirm')
    await screen.findByText(message)

    const buttonYes = await screen.findByTestId('button-yes')
    const buttonNo = await screen.findByTestId('button-no')

    expect(buttonYes).toBeVisible()
    expect(buttonNo).toBeVisible()

    await userEvent.click(buttonYes)
    expect(onYes).toHaveBeenCalled()

    await userEvent.click(buttonNo)
    expect(onNo).toHaveBeenCalled()
  })

  it('should not render the modal with if conditional render is false', async () => {
    function ParentComponent(): JSX.Element | boolean {
      return false && <ModalYesNo message={'yo'} onYes={onYes} onNo={onNo} />
    }
    // @ts-expect-error: replicating useState
    render(<ParentComponent />)
    expect(screen.queryByTestId('modal-yes-no')).not.toBeInTheDocument()
  })
})
