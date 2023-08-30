import React, { memo, useCallback, useDeferredValue, useState } from "react"
import { TUser } from "../types"
import s from "./UsersList.module.scss"
import { useDeleteVisitor } from "../../visitors"
import { ModalDelete, ModalUser, SearchInput } from "../../../common"
import { Link } from "react-router-dom"
import {
  useAddUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../index"

const UsersList = () => {
  const [addUser] = useAddUserMutation()
  const [deleteUser] = useDeleteUserMutation()
  const [deleteHandler] = useDeleteVisitor()

  //search Input
  const [value, setValue] = useState<string>("")
  const deferredValue = useDeferredValue(value)
  const onChangeHandler = useCallback(
    (value: string) => setValue((prev) => value),
    [],
  )

  const { data } = useGetUsersQuery(deferredValue)

  //DnD
  const [id, setId] = useState<(typeof data.ids)[number]>(
    null as (typeof data.ids)[number],
  )
  const handleDrag = useCallback(
    (id: (typeof data.ids)[number]) => setId((prev) => id),
    [],
  )
  const deleteItem = useCallback(async () => {
    await deleteUser(id)
    deleteHandler({ id: id })
  }, [id])
  //modal Add user
  const [showModal, setShowModal] = useState<boolean>(false)
  const openModal = useCallback(() => setShowModal((prev) => true), [])
  const closeModal = useCallback(() => setShowModal((prev) => false), [])
  //modal Delete user
  const [showDelModal, setDelShowModal] = useState<boolean>(false)

  const openDelModal = useCallback(() => setDelShowModal((prev) => true), [])
  const closeDelModal = useCallback(() => setDelShowModal((prev) => false), [])

  return (
    <div>
      <SearchInput value={value} onChangeHandler={onChangeHandler} />
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

export default UsersList

type Tprops = {
  user: TUser
  handleDrag: (id: string) => void
  //handleDrop: (id: string) => void
}
const UserItem = memo(({ user, handleDrag }: Tprops) => {
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
})
