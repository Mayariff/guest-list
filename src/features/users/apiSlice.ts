import {
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/dist/query/react"
import { createEntityAdapter } from "@reduxjs/toolkit"
import {
  createTag,
  createTags,
  TGetParams,
  TNormalizedRes,
  TUser,
} from "../api"
import { changeUsersInCash } from "./utilities"

const apiAdapter = createEntityAdapter()

const initialState = apiAdapter.getInitialState()

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: retry(fetchBaseQuery({ baseUrl: "http://localhost:3000/" }), {
    maxRetries: 3,
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    getUsers: builder.query<TNormalizedRes<TUser>, TGetParams>({
      query: (params: TGetParams = { page: 1, limit: 13 }) => ({
        url: "users",
        params: {
          _page: params.page,
          _limit: params.limit,
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
      providesTags: (result) => createTag(result, "user"),
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
        url: `user/${user.id}`,
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
        changeUsersInCash<TNormalizedRes<TUser>>(
          { dispatch, queryFulfilled },
          (draft) => {
            const index = draft.ids.indexOf(id)
            if (index > -1) {
              draft.ids.splice(index, 1)
              delete draft.entities[id]
            }
          },
        )
      },
    }),
  }),
})

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useGetUserQuery,
  useEditUserMutation,
  useDeleteUserMutation,
} = apiSlice
