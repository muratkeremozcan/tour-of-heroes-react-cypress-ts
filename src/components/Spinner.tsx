import React from 'react'
import {FaSpinner} from 'react-icons/fa'

export default function Spinner(
  props: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLSpanElement> &
    React.HTMLAttributes<HTMLSpanElement>,
) {
  return (
    <span {...props}>
      <FaSpinner className="icon-loading" data-cy="spinner" />
    </span>
  )
}
