import {FaReact} from 'react-icons/fa'
import {NavLink} from 'react-router-dom'

export default function HeaderBarBrand() {
  return (
    <div data-cy="header-bar-brand" className="navbar-brand">
      <a
        href="https://reactjs.org/"
        target="_blank"
        rel="noopener noreferrer"
        className="navbar-item"
        data-cy="header-bar-brand-link"
      >
        <div data-cy="react-icon-svg">
          <FaReact />
        </div>
      </a>
      <NavLink data-cy="navLink" to="/" className="navbar-item navbar-home">
        <span className="tour">TOUR</span>
        <span className="of">OF</span>
        <span className="heroes">HEROES</span>
      </NavLink>
    </div>
  )
}
