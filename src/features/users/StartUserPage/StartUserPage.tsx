import React, { useCallback, useState } from "react"
import { ModalUser } from "../../../common"
import { useAddUserMutation } from "../index"
import s from "./StartUserPage.module.scss"
import { img } from "../../../assets/image";


const StartUserPage = () => {
  const [addUser] = useAddUserMutation()
  const [showModal, setShowModal] = useState<boolean>(false)
  const openModal = useCallback(() => setShowModal((prev) => true), [])
  const closeModal = useCallback(() => setShowModal((prev) => false), [])

  const image = { backgroundImage: `url(${img.userAdd})` }
  return (
    <div className={s.container}>
      <h1 className={s.title}>Start page</h1>
      <button onClick={openModal} className={s.btn} style={image}>
        Add User
      </button>
      <ModalUser
        closeModal={closeModal}
        showModal={showModal}
        onSave={addUser}
      />
    </div>
  )
}

export default StartUserPage
