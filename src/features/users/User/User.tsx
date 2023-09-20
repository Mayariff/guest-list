import React, { useCallback, useState } from "react"
import { useParams } from "react-router"
import {
  TUser,
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUserQuery,
} from "../index"
import s from "./User.module.scss"
import { ModalDelete, ModalUser } from "../../../common"
import { useDeleteVisitor } from "../../visitors"
import { img } from "../../../assets/image"

const User = () => {
  const { userID } = useParams()
  const { data, isError, error } = useGetUserQuery(userID)
  const [editUser] = useEditUserMutation()
  const [deleteUser] = useDeleteUserMutation()
  const [deleteHandler] = useDeleteVisitor()

  //Edit modal
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const openModal = useCallback(() => setShowEditModal((prev) => true), [])
  const closeModal = useCallback(() => setShowEditModal((prev) => false), [])
 /* const editItem = useCallback(async (u: Partial<TUser>) => {
    try {
      await editUser(u).unwrap()
    } catch (e) {
      throw Error()
    }
  }, [])*/

  //Del modal
  const [showDelModal, setDelShowModal] = useState<boolean>(false)
  const openDelModal = useCallback(() => setDelShowModal((prev) => true), [])
  const closeDelModal = useCallback(() => setDelShowModal((prev) => false), [])

  const deleteItem = useCallback(async () => {
    try {
      await deleteUser(userID)
      deleteHandler({ id: data.id })
    } catch (e) {
      throw Error()
    }
  }, [userID, deleteHandler])
  if (isError) return <Error errorText={error | errorInUsers} />
  return (
    <div className={s.container}>
      {data && (
        <div className={s.content}>
          <div className={s.avatar}>
            <img
              src={data.avatar ? data.avatar : img.baseAvatar}
              alt={"avatar"}
              className={s.avatarImg}
            />
          </div>
          <div className={s.title}>
            {data.first_name} {data.last_name}
          </div>
          <div className={s.info}>{data.email}</div>
          <div className={s.btnMenu}>
            <button onClick={openModal} className={s.editBtn}>
              Edit
            </button>
            <button onClick={openDelModal} className={s.delBtn}>
              Delete
            </button>
          </div>
          <ModalUser
            closeModal={closeModal}
            showModal={showEditModal}
            onSave={editUser}
            user={data}
          />
          <ModalDelete
            showModal={showDelModal}
            closeModal={closeDelModal}
            user={data}
            onDel={deleteItem}
          />
        </div>
      )}
    </div>
  )
}

export default User
