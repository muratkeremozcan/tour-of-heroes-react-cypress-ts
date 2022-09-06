import Modal from './Modal'
import {MouseEvent} from 'react'

type ModalYesNoProps = {
  message: string
  onYes: (e: MouseEvent<HTMLButtonElement>) => void
  onNo: (e: MouseEvent<HTMLButtonElement>) => void
}

export default function ModalYesNo({message, onYes, onNo}: ModalYesNoProps) {
  return (
    <Modal>
      <div data-cy="modal-yes-no" className="modal is-active">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Confirm</p>
          </header>
          <section className="modal-card-body">{message}</section>
          <footer className="modal-card-foot card-footer">
            <button
              data-cy="button-no"
              onClick={onNo}
              className="button modal-no"
            >
              No
            </button>
            <button
              data-cy="button-yes"
              onClick={onYes}
              className="button is-primary modal-yes"
            >
              Yes
            </button>
          </footer>
        </div>
      </div>
    </Modal>
  )
}
