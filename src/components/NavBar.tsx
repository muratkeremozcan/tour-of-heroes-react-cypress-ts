import {NavLink} from 'react-router-dom'

export default function NavBar() {
  // const linkIsActive = (link: {isActive: boolean}) =>
  //   link.isActive ? 'active-link' : ''

  return (
    <nav data-cy="nav-bar" className="column is-2 menu">
      <p className="menu-label">Menu</p>
      <ul data-cy="menu-list" className="menu-list">
        <NavLink
          to="/heroes"
          className={link => (link.isActive ? 'active-link' : '')}
        >
          Heroes
        </NavLink>
        <NavLink
          to="/villains"
          className={link => (link.isActive ? 'active-link' : '')}
        >
          Villains
        </NavLink>
        <NavLink
          to="/about"
          className={link => (link.isActive ? 'active-link' : '')}
        >
          About
        </NavLink>
      </ul>
    </nav>
  )
}
