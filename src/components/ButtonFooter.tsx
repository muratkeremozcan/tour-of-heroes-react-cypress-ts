import type {StyledIcon} from '@styled-icons/styled-icon'
import {SyntheticEvent} from 'react'

type ButtonFooterProps = {
  label: string
  IconClass: StyledIcon
  onClick: (e: SyntheticEvent) => void
}

export default function ButtonFooter({
  label,
  IconClass,
  onClick,
}: ButtonFooterProps) {
  return (
    <button data-cy={`${label}-button`} aria-label={label} onClick={onClick}>
      <IconClass />
      <span>{label}</span>
    </button>
  )
}
