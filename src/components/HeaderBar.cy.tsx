import HeaderBar from './HeaderBar'

import {BrowserRouter} from 'react-router-dom'

describe('HeaderBar', () => {
  it('should render', () => {
    cy.mount(
      <BrowserRouter>
        <HeaderBar />
      </BrowserRouter>,
    )
    cy.getByCy('header-bar-brand')
  })
})
