import React, { memo, useState } from "react"
import s from "./VisitorList.module.scss"
import { TUser } from "../../users"
import { Tstatus } from "../types"
import { Popup } from "../../../common"

type TProps = {
  items: TUser[]
  title: string
  board: Tstatus
  handleDrag: (params: { item: TUser; board: Tstatus }) => void
  handleDrop: (params: { item?: TUser; board: Tstatus }) => void
}
const VisitorList = memo(
  ({ items, title, board, handleDrag, handleDrop }: TProps) => {
    const onDropListAria = (e, items, board) => {
      if (!e.defaultPrevented) {
        handleDrop({ board })
      }
      setIsHoverBoard(false)
    }

    //css
    const [isHoverBoard, setIsHoverBoard] = useState<boolean>(false)
    const changeHoverStyle = (e, isHover) => {
      e.preventDefault()
      setIsHoverBoard((prev) => isHover)
    }
    const boardStyle = isHoverBoard
      ? ` ${s.listContainer} ${s.activeBoard}`
      : s.listContainer
    return (
      <div
        className={boardStyle}
        onDragOver={(e) => changeHoverStyle(e, true)}
        onDragLeave={(e) => changeHoverStyle(e, false)}
      >
        <h3 className={s.title}>{title}</h3>
        <ol
          className={s.itemsListAria}
          onDrop={(e) => onDropListAria(e, items, board)}
        >
          {items.length === 0 ? (
            <div className={s.emptyList}>The list is empty</div>
          ) : (
            items.map((i) => (
              <VisitorItem
                key={i.id}
                item={i}
                board={board}
                handleDrop={handleDrop}
                handleDrag={handleDrag}
              />
            ))
          )}
        </ol>
      </div>
    )
  },
)

type TvisitorProps = {
  item: TUser
  board: Tstatus
  handleDrag: (params: { item: TUser; board: Tstatus }) => void
  handleDrop: (params: { item: TUser; board: Tstatus }) => void
}

const VisitorItem = memo(
  ({ item, board, handleDrop, handleDrag }: TvisitorProps) => {
    //Dnd and styles
    const browserClassName = "_item_15uc6_31"
    const dragOverHandler = (e) => {
      e.preventDefault()
      e.currentTarget.style.color = "#f7f7f7"
      e.currentTarget.style.backgroundColor = "#1976d2"
    }
    const onDragLeaveHandler = (e) => {
      e.currentTarget.style.color = "#764abc"
      e.currentTarget.style.backgroundColor = "white"
    }
    const dragStartHandler = (e, item, board) => {
      handleDrag({ item, board })
    }
    const dropHandler = (e, item, board) => {
      e.preventDefault()
      handleDrop({ item, board })
      e.currentTarget.style.color = "#764abc"
      e.currentTarget.style.backgroundColor = "white"
      e.currentTarget.style.boxShadow =
        "0 0px 1px hsla(0, 0%, 0%, 0.2), 0 1px 2px hsla(0, 0%, 0%, 0.2)"
    }

    //popUp
    const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false)
    const openPopup = (e) => setIsOpenPopup(true)
    const closePopup = () => setIsOpenPopup(false)

    return (
      <li
        className={s.item}
        draggable={true}
        onDragStart={(e) => dragStartHandler(e, item, board)} //сработает когда взяли item
        onDrop={(e) => dropHandler(e, item, board)} //отпустили и какое то событие ожидаем
        onDragOver={dragOverHandler} //находимся над др объектом
        onDragLeave={onDragLeaveHandler} //сработает когда вышли за пределы другого item
        onDragEnd={onDragLeaveHandler}
      >
        <span className={s.itemText} onClick={openPopup}>
          {item.first_name}
        </span>
        {isOpenPopup && (
          <Popup
            closePopup={closePopup}
            item={item}
            isOpenPopup={isOpenPopup}
          />
        )}
      </li>
    )
  },
)

export default VisitorList
