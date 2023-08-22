import React from "react"
import {
  useAddUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
} from "./apiSlice"

import { useAddVisitor } from "../visitors/apiVisitorsHooks"
import { useGetVisitorsQuery } from "../visitors/visitorsSlice"
import { status } from "../visitors/types"

const UserList = () => {
  const { data } = useGetUsersQuery()
  const { data: visitors } = useGetVisitorsQuery()
  const [addHandler] = useAddVisitor({
    status: status.visit as status,
    data: 10,
  })
  const [addUser] = useAddUserMutation()
  const [deleteUser] = useDeleteUserMutation()
  const addUserHandler = () => {
    addUser({
      id: 171,
      email: "george.bluth@reqres.in",
      first_name: "G",
      last_name: "Bluth",
      avatar: "hdvf",
    })
  }
  const deleteUserHandler = () => {
    deleteUser(171)
  }
  const mutHandler = () => {
    addHandler()
  }
  /*const sortedUsers = useMemo(() => {
    const sortedPosts = posts.slice()
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date))
    return sortedPosts
  }, [posts])*/
  return (
    <div>
      <button onClick={addUserHandler}> add </button>
      <button onClick={deleteUserHandler}> del </button>
      <button onClick={mutHandler}> mut </button>
      {data?.ids}
    </div>
  )
}

export default UserList

type Tprops ={
  user
}
const UserItem=()=>{

}