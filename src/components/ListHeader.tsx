import {SyntheticEvent} from 'react'
import {NavLink} from 'react-router-dom'
import {FiRefreshCcw} from 'react-icons/fi'
import {GrAdd} from 'react-icons/gr'

type ListHeaderProps = {
  title: 'Heroes' | 'Villains' | 'About'
  handleAdd: (e: SyntheticEvent) => void
  handleRefresh: (e: SyntheticEvent) => void
}

export default function ListHeader({
  title,
  handleAdd,
  handleRefresh,
}: ListHeaderProps) {
  return (
    <div data-cy="list-header" className="content-title-group">
      <NavLink data-cy="title" to={title}>
        <h2>{title}</h2>
      </NavLink>
      <button data-cy="add-button" onClick={handleAdd} aria-label="add">
        <GrAdd />
      </button>
      <button
        data-cy="refresh-button"
        onClick={handleRefresh}
        aria-label="refresh"
      >
        <FiRefreshCcw />
      </button>
    </div>
  )
}
