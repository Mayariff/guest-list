import React, { useCallback, useState } from "react"
import { ModalUser } from "../../../common"
import { useAddUserMutation, UsersList } from "../index"

const StartUserPage = () => {
  const [addUser] = useAddUserMutation()
  const [showModal, setShowModal] = useState<boolean>(false)
  const openModal = useCallback(() => setShowModal((prev) => true), [])
  const closeModal = useCallback(() => setShowModal((prev) => false), [])

  return (
    <div>
      <UsersList />
      start page
      <button onClick={openModal}> add</button>
      <ModalUser
        closeModal={closeModal}
        showModal={showModal}
        onSave={addUser}
      />
    </div>
  )
}

export default StartUserPage
