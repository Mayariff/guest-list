import React, { useMemo, useState } from "react"

import { TUser, TVisitors } from "../api"
import { useGetVisitorsQuery } from "./visitorsSlice"
import { useGetUsersQuery } from "../users"
import { Error, Loading, VisitorList } from "../../common"
import {
  useAddVisitor,
  useDeleteVisitor,
  useSelectedUsers,
} from "./apiVisitorsHooks"
import { status, Tboards } from "./types"

const VisitorsPage = () => {
  const {
    data: usersData,
    isFetching: isFetchichingUsers,
    isSuccess: isSuccessUsers,
    isError: isErrorInUsers,
    error: errorInUsers,
  } = useGetUsersQuery<TUser[]>()

  const {
    data = { come_event: [], skip_event: [], wait_answer: [] },
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetVisitorsQuery<TVisitors>()

  const [deleteHandler] = useDeleteVisitor()
  const [addHandler] = useAddVisitor()

  const comeUsers = useSelectedUsers(data.come_event, usersData)
  const skipUsers = useSelectedUsers(data.skip_event, usersData)
  const waitingUsers = useSelectedUsers(data.wait_answer, usersData)

  //DnD
  const [curBoard, setCurBoard] = useState<Tboards>(null as Tboards)
  const [users, setUsers] = useState<TUser[]>(null as TUser[])
  const [user, setUser] = useState<TUser>(null as TUser)

  const handleDrag = ({ item, board }: { item: TUser; board: Tboards }) => {
    setUser(item)
    setUsers((u) => {
      if (board == status.skip) return skipUsers
      else if (board == status.visit) return comeUsers
      else return waitingUsers
    })
    setCurBoard(board)
  }

  const handleDrop = ({ item, board }: { item: TUser; board: Tboards }) => {
    //в рамках одной доски
    if (board === curBoard) {
      const curIndex = users.indexOf(user)
      const dropIndex = users.indexOf(item)
      users.splice(curIndex, 1)
      users.splice(dropIndex, 0, user)
    } else {
      //переместили на др доску
      const dropIndex = data[board].indexOf(item.id)
      deleteHandler({ id: user.id, status: curBoard })
      addHandler({ id: user.id, status: board, index: dropIndex })
    }
    setCurBoard(null)
    setUser(null)
    setUsers(null)
  }

  if (isFetching && isFetchichingUsers) return <Loading />
  if (isError || isErrorInUsers)
    return <Error errorText={error | errorInUsers} />
  return (
    <div>
      <VisitorList
        items={comeUsers}
        title={"Точно придут"}
        board={status.visit}
        handleDrag={handleDrag}
        handleDrop={handleDrop}
      />
      <VisitorList
        items={skipUsers}
        title={"Точно НЕ придут"}
        board={status.skip}
        handleDrag={handleDrag}
        handleDrop={handleDrop}
      />
      <VisitorList
        items={waitingUsers}
        title={"Ждем ответ"}
        board={status.wait}
        handleDrag={handleDrag}
        handleDrop={handleDrop}
      />
    </div>
  )
}

export default VisitorsPage
