import React, { useState } from "react"
import { useParams } from "react-router"
import { useEditUserMutation, useGetUserQuery } from "./apiSlice"
import { ModalUser } from "../../common"

const User = () => {
  const { userID } = useParams()
  const { data } = useGetUserQuery(userID)
  const [editUser] = useEditUserMutation()
  const [showModal, setShowModal] = useState<boolean>(false)
  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)
  return (
    <div>
      {data && (
        <>
          <img src={data.avatar} />
          <div>
            {data.first_name} {data.last_name}
          </div>
          <div>{data.email}</div>
          <button onClick={openModal}>Edit</button>
          <ModalUser
            closeModal={closeModal}
            showModal={showModal}
            onSave={editUser}
            user={data}
          />
        </>
      )}
    </div>
  )
}

export default User
