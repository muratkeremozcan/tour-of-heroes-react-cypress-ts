import {ChangeEvent} from 'react'

type InputDetailProps = {
  name: string
  value: string
  placeholder?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  readOnly?: boolean
}

export default function InputDetail({
  name,
  value,
  placeholder,
  onChange,
  readOnly,
}: InputDetailProps) {
  return (
    <div data-cy={`input-detail-${name}`} className="field">
      <label className="label" htmlFor={name}>
        {name}
      </label>
      <input
        name={name}
        defaultValue={value}
        placeholder={placeholder}
        onChange={onChange}
        readOnly={readOnly}
        className="input"
        type="text"
      ></input>
    </div>
  )
}
