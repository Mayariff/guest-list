import { useMemo } from "react"
import { findStatus } from "./utilities"
import {
  Tstatus,
  useChangeVisitorsMutation,
  useGetVisitorsQuery,
} from "./index"

export const useDeleteVisitor = () => {
  const { data } = useGetVisitorsQuery()
  let res = useChangeVisitorsMutation()
  let [func, rest] = res
  const deleteHandler = (arg: { status?: Tstatus; id: number }) => {
    const curStatus = arg.status ? arg.status : findStatus(data, arg.id)
    const newData =
      "undefined" === typeof data
        ? []
        : data[curStatus].filter((el) => arg.id !== el)

    const args = {
      status: curStatus,
      data: newData,
    }
    return func(args)
  }

  return [deleteHandler, rest]
}

export const useAddVisitor = () => {
  const { data } = useGetVisitorsQuery()
  let res = useChangeVisitorsMutation()
  let [func, rest] = res
  const addHandler = (arg: { status: Tstatus; id: number; index?: number }) => {
    let newData
    if (typeof data !== "undefined") {
      if (arg.index > -1) {
        newData = [...data[arg.status]]
        newData.splice(arg.index, 0, arg.id)
      } else {
        const set = new Set(data[arg.status])
        set.add(arg.id)
        newData = [...set]
      }
    }

    const args = {
      status: arg.status,
      data: newData,
    }
    return func(args)
  }
  return [addHandler, rest]
}

export const useSelectedUsers = (
  statusArray: number[],
  users: TUser[],
): TUser[] => {
  return useMemo(
    () => statusArray.map((u) => users.entities[u]),
    [statusArray, users],
  )
}
