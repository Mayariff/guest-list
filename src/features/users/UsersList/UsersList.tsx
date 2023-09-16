import React, { memo, useCallback, useDeferredValue, useState } from "react"
import { TUserItem } from "../types"
import s from "./UsersList.module.scss"
import { useDeleteVisitor } from "../../visitors"
import { ModalDelete, ModalUser, SearchInput } from "../../../common"
import { Link } from "react-router-dom"
import {
  useAddUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../index"
import { useParams } from "react-router"
import { useDnDStyle, useIdentifyScreen } from "../../../helpers"
import { img } from "../../../assets/image"

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

  //css
  const image = { backgroundImage: `url(${img.trash})` }
  const [DragAriaStyle, changeStyle] = useDnDStyle({
    idleStyle: s.delAria,
    dragOverStyle: s.dragOver,
    dragStartStyle: s.dragStart,
    dragLeaveStyle: s.dragLeave,
  })

  const screen = useIdentifyScreen()

  const handleDragOver = (e) => {
    e.preventDefault()
    changeStyle("dragOver")
  }
  const handleDragLeave = (e) => changeStyle("dragLeave")

  return (
    <div className={s.container}>
      <div className={screen==='vertical'? `${s.sector} ${s.ariaA}`:s.sector }>
        <SearchInput value={value} onChangeHandler={onChangeHandler} />
      </div>
      <div className={screen==='vertical'? `${s.sector} ${s.list} ${s.ariaB}`:`${s.sector} ${s.list}`}>
        <ol className={s.itemList}>
          {data?.ids.length === 0 && (
            <div className={s.noMatches}>Sorry, no matches found</div>
          )}
          {data?.ids.map((u) => (
            <UserItem
              key={u}
              user={data.entities[u]}
              handleDrag={handleDrag}
              dragCssHandler={changeStyle}
            />
          ))}
        </ol>
      </div>
      <div className={screen==='vertical'? `${s.sector} ${s.ariaC}`:s.sector }>
        <div
          style={image}
          className={DragAriaStyle}
          onDrop={openDelModal}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          Delete User
        </div>
      </div>
      <div className={screen==='vertical'? `${s.sector} ${s.ariaD}`:s.sector }>
        <button onClick={openModal} className={s.btn}>
          +Add User
        </button>
      </div>

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

const UserItem = memo(({ user, handleDrag, dragCssHandler }: TUserItem) => {
  const { userID } = useParams()
  const { first_name, last_name, id } = user
  const dragStartHandler = (e, id) => {
    handleDrag(id)
    dragCssHandler("dragStart")
  }

  const itemStyle = +userID === id ? `${s.item} ${s.activeItem}` : s.item

  return (
    <li className={itemStyle}>
      <Link
        reloadDocument
        to={`${id}`}
        onDragStart={(e) => dragStartHandler(e, id)} //сработает когда взяли item
        onDragOver={(e) => e.preventDefault()} //находимся над др объектом
        onDragEnd={(e) => dragCssHandler("idle")}
      >
        {first_name} {last_name}
        {+userID === id && <span className={s.star}>★</span>}
      </Link>
    </li>
  )
})
