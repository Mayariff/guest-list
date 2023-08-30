import React, { useCallback, useState } from "react"
import { useParams } from "react-router"
import { ModalUser } from "../../../common"
import { useEditUserMutation, useGetUserQuery } from "../index"

const UserPage = () => {
  const { userID } = useParams()
  const { data } = useGetUserQuery(userID)
  const [editUser] = useEditUserMutation()
  const [showModal, setShowModal] = useState<boolean>(false)
  const openModal = useCallback(() => setShowModal((prev) => true), [])
  const closeModal = useCallback(() => setShowModal((prev) => false), [])
  return (
    <div>
      {data && (
        <>
          <img src={data.avatar} alt={"avatar"} />
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

export default UserPage
