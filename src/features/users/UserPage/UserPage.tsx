import React from "react"
import { UsersList } from "../index"
import { useParams } from "react-router"
import { StartUserPage, User } from "../../index"
import s from "./UserPage.module.scss"

const UserPage = () => {
  const { userID } = useParams()
  return (
    <div className={s.pageContainer}>
      <UsersList />
      {userID ?  <User />: <StartUserPage />}
    </div>
  )
}

export default UserPage
