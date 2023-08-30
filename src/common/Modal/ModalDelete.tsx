import React, { memo, useState } from "react"
import { createPortal } from "react-dom"
import s from "./Modal.module.scss"
import { actionStatus, TDelProps } from "./types"

const ModalDelete = memo(
  ({ showModal, closeModal, user, onDel }: TDelProps) => {
    const [status, setStatus] = useState<null | string>(null)

    const handelClick = async () => {
      setStatus(actionStatus.loading)
      try {
        await onDel()
        setStatus(actionStatus.ok)
        setTimeout(() => {
          setStatus(null)
          closeModal()
        }, 4000)
      } catch (e) {
        console.log(e)
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
                    {status === actionStatus.commonError && <div>{status}</div>}
                    Delete {user?.first_name} {user?.last_name}?
                    <button
                      onClick={handelClick}
                      disabled={status === actionStatus.loading}
                    >
                      Yes
                    </button>
                    <button
                      onClick={closeModal}
                      disabled={status === actionStatus.loading}
                    >
                      No
                    </button>
                  </>
                )}
              </div>
            </>,
            document.body,
          )}
      </>
    )
  },
)

export default ModalDelete
