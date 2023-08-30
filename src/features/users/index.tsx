import UsersList from "./UsersList/UsersList"
import { apiSlice } from "./apiSlice"
import type { TUser } from "./types"

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useGetUserQuery,
  useEditUserMutation,
  useDeleteUserMutation,
} = apiSlice

export { UsersList, TUser }
