import React, { useState } from "react"
import { createPortal } from "react-dom"
import s from "./Modal.module.scss"
import { actionStatus, TDelProps } from "./types"

const ModalDelete = ({ showModal, closeModal, user, onDel }: TDelProps) => {
  const [status, setStatus] = useState<null | string>(null)
  const handelClick = async () => {
    try {
      await onDel()
      setStatus(actionStatus.ok)
      setTimeout(() => {
        closeModal()
      }, 7000)
    } catch (e) {
      setStatus(actionStatus.commonError)
    }
  }
  return (
    <>
      {showModal &&
        createPortal(
          <>
            <div className={s.modalOutside} onClick={closeModal}></div>
            <div className={s.modalContainer}>
              {status === actionStatus.ok ? (
                <div>{status}</div>
              ) : (
                <>
                  {status == actionStatus.commonError && <div>{status}</div>}
                  Delete {user?.first_name} {user?.last_name}?
                  <button onClick={handelClick}>Yes</button>
                  <button onClick={closeModal}>No</button>
                </>
              )}
            </div>
          </>,
          document.body,
        )}
    </>
  )
}

export default ModalDelete
