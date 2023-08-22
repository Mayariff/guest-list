import React from "react"
import s from "./VisitorList.module.scss"
import { TUser } from "../../features/users/types"
import { Tboards } from "../../features/visitors/types"

type TProps = {
  items: TUser[]
  title: string
  board: Tboards
  handleDrag: (params: { item: TUser; board: Tboards }) => void
  handleDrop: (params: { item: TUser; board: Tboards }) => void
}
const VisitorList = ({
  items,
  title,
  board,
  handleDrag,
  handleDrop,
}: TProps) => {
  return (
    <div className={s.container}>
      <div>{title}</div>
      <ol className={s.itemsAria}>
        {items.map((i) => (
          <VisitorItem
            key={i.id}
            item={i}
            board={board}
            handleDrop={handleDrop}
            handleDrag={handleDrag}
          />
        ))}
      </ol>
    </div>
  )
}

type TvisitorProps = {
  item: TUser
  board: Tboards
  handleDrag: (params: { item: TUser; board: Tboards }) => void
  handleDrop: (params: { item: TUser; board: Tboards }) => void
}

const VisitorItem = ({
  item,
  board,
  //dragHandler,
  handleDrop,
  handleDrag,
}: TvisitorProps) => {
  const dragStartHandler = (e, item, board) => handleDrag({ item, board })
  const dropHandler = (e, item, board) => {
    e.preventDefault()
    handleDrop({ item, board })
  }
  return (
    <li
      className={s.item}
      draggable={true}
      onDragStart={(e) => dragStartHandler(e, item, board)} //сработает когда взяли item
      onDrop={(e) => dropHandler(e, item, board)} //отпустили и какое то событие ожидаем
      onDragOver={(e) => e.preventDefault()} //находимся над др объектом
      /*onDragLeave={} //сработает когда вышли за пределы другого item
      onDragEnd={} //отпустили перемещение
      onDragOver={} //находимся над др объектом
*/
    >
      {item.first_name}
    </li>
  )
}

export default VisitorList
