import { useChangeVisitorsMutation, useGetVisitorsQuery } from "./visitorsSlice"

export const useDeleteVisitor = (param: TInfoVisitor<number>) => {
  const { data } = useGetVisitorsQuery()
  const newData =
    typeof data !== "undefined"
      ? data[param.status].filter((el) => param.data !== el)
      : []
  let res = useChangeVisitorsMutation()
  let [func, rest] = res
  const arg = {
    status: param.status,
    data: newData,
  }
  const deleteHandler = () => func(arg)
  return [deleteHandler, rest]
}

export const useAddVisitor = (param: TInfoVisitor<number>) => {
  const { data } = useGetVisitorsQuery()
  let newData
  if (typeof data !== "undefined") {
    const set = new Set(data[param.status])
    set.add(param.data)
    newData = [...set]
  }
  let res = useChangeVisitorsMutation()
  let [func, rest] = res
  const arg = {
    status: param.status,
    data: newData,
  }
  const addHandler = () => func(arg)

  return [addHandler, rest]
}
