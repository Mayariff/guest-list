import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"

type userType = {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}
type itemListType<T> = {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: T[]
}

type getParamsType = {
  page?: number
  perPage?: number
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://reqres.in/api/" }),
  endpoints: (builder) => ({
    getUsers: builder.query<itemListType<userType>, getParamsType>({
      query: ({ page = 0, perPage = 2 }) =>
        `users?page=${page}&per_page=${perPage}`,
    }),
  }),
})

export const { useGetUsersQuery } = apiSlice
