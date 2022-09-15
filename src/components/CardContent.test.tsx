import CardContent from './CardContent'
import {render, screen} from '@testing-library/react'

describe('CardContent', () => {
  it('should render the card content', async () => {
    const name = 'Bjorn Ironside'
    const description = 'king of 9th century Sweden'
    render(<CardContent name={name} description={description} />)

    expect(await screen.findByText(name)).toBeVisible()
    expect(await screen.findByText(description)).toBeVisible()
  })
})
