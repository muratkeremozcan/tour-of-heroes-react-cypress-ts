import HeaderBarBrand from './HeaderBarBrand'

export default function HeaderBar() {
  return (
    <header data-cy="header-bar">
      <nav
        className="navbar has-background-dark is-dark"
        role="navigation"
        aria-label="main navigation"
      >
        <HeaderBarBrand />
      </nav>
    </header>
  )
}
