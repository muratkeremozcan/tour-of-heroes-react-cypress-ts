/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type {ReactNode} from 'react'
import {useEffect, useRef} from 'react'
import {createPortal} from 'react-dom'

type ModalProps = {
  children?: ReactNode
}

const Modal = ({children}: ModalProps) => {
  const el = useRef(document.createElement('div'))

  let modalRoot = document.getElementById('modal-root')
  if (!modalRoot) {
    modalRoot = document.createElement('div')
    modalRoot.setAttribute('id', 'modal-root')
    document.body.appendChild(modalRoot)
  }

  useEffect(() => {
    const currentEl = el.current

    modalRoot!.appendChild(currentEl)

    return () => {
      modalRoot!.removeChild(currentEl)
    }
  }, [modalRoot])

  return createPortal(children, el.current)
}

export default Modal
