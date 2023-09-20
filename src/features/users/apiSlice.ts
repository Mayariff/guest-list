import {
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/dist/query/react"
import { createEntityAdapter } from "@reduxjs/toolkit"
import { changeUsersInCash } from "./utilities"
import { createTag, createTags } from "../../helpers"
import { TNormalizedRes, TUser } from "./types"

export const baseURl = "http://localhost:3000"
const apiAdapter = createEntityAdapter()
const initialState = apiAdapter.getInitialState()


export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: retry(fetchBaseQuery({ baseUrl: baseURl }), {
    maxRetries: 3,
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    getUsers: builder.query<TNormalizedRes<TUser>, string>({
      query: (query: string = "") => ({
        url: "users",
        params: {
          q: query,
        },
      }),
      providesTags: (result) => createTags(result.ids, "user"),
      transformResponse: (res) => apiAdapter.setAll(initialState, res),
    }),
    getUser: builder.query<TUser, string>({
      query: (id: string) => ({ url: `users/${id}` }),
      providesTags: (result) => createTag(result, "user"),
    }),
    addUser: builder.mutation<TUser, TUser>({
      query: (user) => ({
        url: `users`,
        method: "POST",
        body: user,
      }),
      providesTags:  (result:TUser) => createTag(result, "user"),
      async onQueryStarted(user, { dispatch, queryFulfilled }) {
        changeUsersInCash<TNormalizedRes<TUser>>(
          { dispatch, queryFulfilled },
          (draft) => {
            draft.ids.push(user.id)
            draft.entities[user.id] = user
          },
        )
      },
    }),
    editUser: builder.mutation<TUser, Partial<TUser>>({
      query: (user) => ({
        url: `users/${user.id}`,
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: (result) => createTag(result, "user"),
    }),
    deleteUser: builder.mutation<string, number | string>({
      query: (id: number | string) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id: number | string, { dispatch, queryFulfilled }) {
        await changeUsersInCash<TNormalizedRes<TUser>>(
          { dispatch, queryFulfilled },
          (draft) => {
            const index = draft.ids.indexOf(+id)
            if (index > -1) {
              draft.ids.splice(index, 1)
              delete draft.entities[+id]
            }
          },
        )
      },
    }),
  }),
})
