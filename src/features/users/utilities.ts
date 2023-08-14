//wrapper for onQueryStarted (getUsers)
import { apiSlice } from "./apiSlice"

export const changeUsersInCash = async <T>(
  { dispatch, queryFulfilled },
  changeFunc: (draft: T) => T,
): T => {
  const patchResult = dispatch(
    apiSlice.util.updateQueryData("getUsers", undefined, changeFunc),
  )
  try {
    await queryFulfilled
  } catch {
    patchResult.undo()
  }
}
