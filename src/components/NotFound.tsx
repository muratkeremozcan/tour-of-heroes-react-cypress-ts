import {FaExclamationTriangle} from 'react-icons/fa'

export default function NotFound() {
  return (
    <div data-cy="not-found" className="content-container">
      <div className="content-title-group not-found">
        <FaExclamationTriangle />
        &nbsp;
        <span className="title">These aren't the bits you're looking for</span>
      </div>
    </div>
  )
}
