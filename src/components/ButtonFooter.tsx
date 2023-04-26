import type {FaUndo, FaRegSave, FaEdit, FaTrash} from 'react-icons/fa'
import type {MouseEvent} from 'react'

type ButtonFooterProps = {
  label: 'Cancel' | 'Save' | 'Edit' | 'Delete'
  IconClass: typeof FaUndo | typeof FaRegSave | typeof FaEdit | typeof FaTrash
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

export default function ButtonFooter({
  label,
  IconClass,
  onClick,
}: ButtonFooterProps) {
  return (
    <button
      data-cy={`${label.toLowerCase()}-button`}
      aria-label={label}
      onClick={onClick}
    >
      <IconClass />
      &nbsp;
      <span>{label}</span>
    </button>
  )
}
