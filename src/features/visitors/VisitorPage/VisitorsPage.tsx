import React, { useCallback, useState } from "react"
import { Error, Loading, VisitorList } from "../../../common"
import { TUser, useGetUsersQuery } from "../../users"
import s from "./VisitorsPage.module.scss"
import {
  status,
  Tstatus,
  TVisitors,
  useAddVisitor,
  useDeleteVisitor,
  useGetVisitorsQuery,
  useSelectedUsers,
} from "../index"

const VisitorsPage = () => {
  const {
    data: usersData,
    isFetching: isFetchichingUsers,
    isSuccess: isSuccessUsers,
    isError: isErrorInUsers,
    error: errorInUsers,
  } = useGetUsersQuery()

  const {
    data = { come_event: [], skip_event: [], wait_answer: [] },
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetVisitorsQuery<TVisitors>({
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })

  const [deleteHandler] = useDeleteVisitor()
  const [addHandler] = useAddVisitor()

  const comeUsers = useSelectedUsers(data.come_event, usersData)
  const skipUsers = useSelectedUsers(data.skip_event, usersData)
  const waitingUsers = useSelectedUsers(data.wait_answer, usersData)

  //DnD
  const [curBoard, setCurBoard] = useState<Tstatus>(null as Tstatus)
  const [users, setUsers] = useState<TUser[]>(null as TUser[])
  const [user, setUser] = useState<TUser>(null as TUser)

  const handleDrag = useCallback(
    ({ item, board }: { item: TUser; board: Tstatus }) => {
      setUser((prev) => item)
      setUsers((u) => {
        if (board === status.skip) return skipUsers
        else if (board === status.visit) return comeUsers
        else return waitingUsers
      })
      setCurBoard((prev) => board)
    },
    [data],
  )

  const handleDrop = useCallback(
    ({ item, board }: { item?: TUser; board: Tstatus }) => {
      //в рамках одной доски
      if (board === curBoard) {
        const curIndex = users.indexOf(user)
        const dropIndex = item ? users.indexOf(item) : users.length
        users.splice(curIndex, 1)
        users.splice(dropIndex, 0, user)
      } else {
        //переместили на др доску
        const dropIndex = data[board].indexOf(item?.id || users.length)
        deleteHandler({ id: user.id, status: curBoard })
        addHandler({ id: user.id, status: board, index: dropIndex })
      }
      setCurBoard((prev) => null)
      setUser((prev) => null)
      setUsers((prev) => null)
    },
    [users, curBoard, data, user],
  )

  if (isFetching && isFetchichingUsers) return <Loading />
  if (isError || isErrorInUsers)
    return <Error errorText={error | errorInUsers} />
  return (
    <div className={s.container}>
      <div className={s.ariaA}>
        <VisitorList
          items={comeUsers}
          title={"Confirmed participation"}
          board={status.visit}
          handleDrag={handleDrag}
          handleDrop={handleDrop}
        />
      </div>
      <div className={s.ariaB}>
        <VisitorList
          items={skipUsers}
          title={"Refused"}
          board={status.skip}
          handleDrag={handleDrag}
          handleDrop={handleDrop}
        />
      </div>
      <div className={s.ariaC}>
        <VisitorList
          items={waitingUsers}
          title={"Waiting for a response"}
          board={status.wait}
          handleDrag={handleDrag}
          handleDrop={handleDrop}
        />
      </div>
    </div>
  )
}

export default VisitorsPage
