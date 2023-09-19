import React, { MouseEventHandler } from "react";
import { TUser } from "../../features/users"
import s from "./Popup.module.scss"
import { useOutsideClick } from "../../helpers"
import { Link } from "react-router-dom"
import { PATH } from "../../app/routing"

type TProps = {
  closePopup: () => void
  item: TUser
  isOpenPopup: boolean
}

const Popup = ({ closePopup, item, isOpenPopup }: TProps) => {
  const { email, first_name, last_name, avatar, id } = item

  const onClose:MouseEventHandler<HTMLElement> = (e) => closePopup()
  const rootEl = useOutsideClick(closePopup)

  return (
    <div className={s.container} ref={rootEl}>
      <img src={avatar} alt={"avatar"} className={s.img} />
      <div className={s.info}>
        <Link to={PATH.users + `/${id}`} className={s.link}>
          {first_name} {last_name}
        </Link>
        <div>{email}</div>
      </div>
      <button onClick={onClose} className={s.button}>
        x
      </button>
    </div>
  )
}

export default Popup
