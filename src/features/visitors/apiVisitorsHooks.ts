import { useChangeVisitorsMutation, useGetVisitorsQuery } from "./visitorsSlice"
import { useMemo } from "react"
import { TUser } from "../api"
import { Tstatus } from "./types"
import { findStatus } from "./utilities"

export const useDeleteVisitor = () => {
  const { data } = useGetVisitorsQuery()
  let res = useChangeVisitorsMutation()
  let [func, rest] = res
  const deleteHandler = (arg: { status?: Tstatus; id: number }) => {
    const curStatus = arg.status ? arg.status : findStatus(data, arg.id)
    const newData =
      typeof data !== "undefined"
        ? data[curStatus].filter((el) => arg.id !== el)
        : []

    const argum = {
      status: curStatus,
      data: newData,
    }
    return func(argum)
  }

  return [deleteHandler, rest]
}

export const useAddVisitor = () => {
  const { data } = useGetVisitorsQuery()
  let res = useChangeVisitorsMutation()
  let [func, rest] = res
  const addHandler = (arg: { status: status; id: number; index?: number }) => {
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

    const argum = {
      status: arg.status,
      data: newData,
    }
    return func(argum)
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
