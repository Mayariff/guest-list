import React from "react"
import { useParams } from "react-router"
import { useGetUserQuery } from "./apiSlice"

const User = () => {
  const { userID } = useParams()
  const { data } = useGetUserQuery(userID)

  return <div>{data && data.id}</div>
}

export default User
