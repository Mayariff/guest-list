import React, { memo, MouseEventHandler, useState } from "react";
import { createPortal } from "react-dom"
import s from "./Modal.module.scss"
import { actionStatus, TDelProps } from "./types"
import { useNavigate } from "react-router"
import { PATH } from "../../app/routing"
import { img } from "../../assets/image"

const ModalDelete = memo(
  ({ showModal, closeModal, user, onDel }: TDelProps) => {
    const [status, setStatus] = useState<null | string>(null)
    const navigate = useNavigate()
    const handelClick = async () => {
      setStatus(actionStatus.loading)
      try {
        await onDel()
        setStatus(actionStatus.ok)
        setTimeout(() => {
          setStatus(null)
          closeModal()
          navigate(PATH.users)
        }, 4000)
      } catch (e) {
        setStatus(actionStatus.commonError)
      }
    }
    const closeHandler:MouseEventHandler<HTMLElement>  = (e) => {
      setStatus(null)
      closeModal()
    }
    //css
    const imageSuccess = { backgroundImage: `url(${img.userDel})` }
    return (
      <>
        {showModal &&
          createPortal(
            <>
              <div className={s.modalOutside} onClick={closeHandler}></div>
              <div className={s.modalContainer}>
                {status === actionStatus.ok ? (
                  <div className={s.messageOk} style={imageSuccess}>
                    {status}
                  </div>
                ) : (
                  <>
                    {status === actionStatus.commonError && (
                      <div className={`${s.messageError} ${s.delErrMessage}`}>
                        {status}
                      </div>
                    )}
                    <div className={s.title}>
                      Delete {user?.first_name} {user?.last_name} ?
                    </div>
                    <div className={s.btnAriaDel}>
                      <button
                        className={s.btn}
                        onClick={handelClick}
                        disabled={status === actionStatus.loading}
                      >
                        Yes
                      </button>
                      <button
                        className={s.btn}
                        onClick={closeHandler}
                        disabled={status === actionStatus.loading}
                      >
                        {" "}
                        No
                      </button>
                    </div>
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
