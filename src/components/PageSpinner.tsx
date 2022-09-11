import Spinner from './Spinner'

export default function PageSpinner() {
  return (
    <p className="page-loading" data-cy="page-spinner">
      <Spinner />
    </p>
  )
}
