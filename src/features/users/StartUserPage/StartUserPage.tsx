import React, { useCallback, useState } from "react"
import { ModalUser } from "../../../common"
import { TUser, useAddUserMutation } from "../index"
import s from "./StartUserPage.module.scss"
import { img } from "../../../assets/image"
import { status, useAddVisitor } from "../../visitors"

const StartUserPage = () => {
  const [addUser] = useAddUserMutation()
  const [addHandler] = useAddVisitor()
  const [showModal, setShowModal] = useState<boolean>(false)
  const openModal = useCallback(() => setShowModal((prev) => true), [])
  const closeModal = useCallback(() => setShowModal((prev) => false), [])

  const addItem = async (arg: TUser) => {
    try {
      await addUser(arg).unwrap()
      addHandler({ status: status.wait, id: arg.id })
    } catch (e) {
      throw Error()
    }
  }

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
        onSave={addItem}
      />
    </div>
  )
}

export default StartUserPage
