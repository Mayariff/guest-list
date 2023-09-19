import UsersList from "./UsersList/UsersList"
import { apiSlice, baseURl } from "./apiSlice";
import type { TUser } from "./types"


export const {
  useGetUsersQuery,
  useAddUserMutation,
  useGetUserQuery,
  useEditUserMutation,
  useDeleteUserMutation,
} = apiSlice

export { UsersList, TUser, baseURl }
