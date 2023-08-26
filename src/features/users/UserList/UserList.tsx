import React, { useState } from "react"
import {
  useAddUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../apiSlice"
import { TUser } from "../types"
import s from "./UserList.module.scss"
import { Link } from "react-router-dom"
import { useDeleteVisitor } from "../../visitors"
import { ModalDelete, ModalUser } from "../../../common"

const UserList = () => {
  const { data } = useGetUsersQuery()
  const [addUser] = useAddUserMutation()
  const [deleteUser] = useDeleteUserMutation()
  const [deleteHandler] = useDeleteVisitor()

  //DnD
  const [id, setId] = useState<(typeof data.ids)[number]>(
    null as (typeof data.ids)[number],
  )
  const handleDrag = (id: (typeof data.ids)[number]) => setId(id)
  const deleteItem = async () => {
    await deleteUser(id)
    deleteHandler({ id: id })
  }
  //modal Add user
  const [showModal, setShowModal] = useState<boolean>(false)
  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  //modal Delete user
  const [showDelModal, setDelShowModal] = useState<boolean>(false)
  const openDelModal = () => setDelShowModal(true)
  const closeDelModal = () => setDelShowModal(false)

  return (
    <div>
      <ol>
        {data?.ids.map((u) => (
          <UserItem key={u} user={data.entities[u]} handleDrag={handleDrag} />
        ))}
      </ol>
      <div onDrop={openDelModal} onDragOver={(e) => e.preventDefault()}>
        delete User ccghfgh fghfgfhh fhfghhh fhfghhh dgfgfgggg
      </div>
      <button onClick={openModal}> add</button>
      <ModalDelete
        showModal={showDelModal}
        closeModal={closeDelModal}
        user={data?.entities[id]}
        onDel={deleteItem}
      />
      <ModalUser
        closeModal={closeModal}
        showModal={showModal}
        onSave={addUser}
      />
    </div>
  )
}

export default UserList

type Tprops = {
  user: TUser
  handleDrag: (id: string) => void
  handleDrop: (id: string) => void
}
const UserItem = ({ user, handleDrag, handleDrop }: Tprops) => {
  const { first_name, last_name, id } = user
  const dragStartHandler = (e, id) => handleDrag(id)

  return (
    <li className={s.containerItem}>
      <Link
        to={`${id}`}
        onDragStart={(e) => dragStartHandler(e, id)} //сработает когда взяли item
        //onDrop={(e) => dropHandler(e, id)} //отпустили и какое то событие ожидаем
        onDragOver={(e) => e.preventDefault()} //находимся над др объектом
      >
        {first_name} {last_name}
      </Link>
    </li>
  )
}
