import HeaderBar from './HeaderBar'
import {BrowserRouter} from 'react-router-dom'
import '../styles.scss'

describe('HeaderBar', () => {
  it('should', () => {
    cy.mount(
      <BrowserRouter>
        <HeaderBar />
      </BrowserRouter>,
    )
    cy.getByCy('header-bar-brand')
  })
})
