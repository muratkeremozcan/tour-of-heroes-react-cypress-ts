import type {ChangeEvent} from 'react'
import {useEffect, useState} from 'react'

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
  const [shownValue, setShownValue] = useState('')
  useEffect(() => {
    setShownValue(value)
  }, [value])

  return (
    <div data-cy={`input-detail-${name}`} className="field">
      <label className="label" htmlFor={name}>
        {name}
      </label>
      <input
        name={name}
        role={name}
        defaultValue={shownValue}
        placeholder={placeholder}
        onChange={onChange}
        readOnly={readOnly}
        className="input"
        type="text"
      ></input>
    </div>
  )
}
