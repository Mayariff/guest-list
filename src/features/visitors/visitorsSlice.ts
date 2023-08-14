import { apiSlice } from "../users/apiSlice"
import { TInfoVisitor, TVisitors } from "../api"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { createTags } from "../api/utilities"

export const visitorsApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["visitor"],
  endpoints: (builder) => ({
    getVisitors: builder.query<TVisitors, undefined>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const res = await Promise.all<number[]>([
            fetchWithBQ("http://localhost:3000/come_event"),
            fetchWithBQ("http://localhost:3000/skip_event"),
          ])
          const response = res.reduce((acc, cur) => {
            let currKey = Object.keys(cur.data)[0]
            acc[currKey] = cur.data[currKey]
            return acc
          }, {})

          return { data: response }
        } catch (error: FetchBaseQueryError) {
          return error
        }
      },
      providesTags: (result, error, arg) =>
        createTags(Object.keys(result), "visitor"),
    }),
    changeVisitors: builder.mutation<number[], TInfoVisitor<number[]>>({
      query: (infoVisitor) => ({
        url: `${infoVisitor.status}`,
        method: "PUT",
        body: { [infoVisitor.status]: infoVisitor.data },
      }),
      //invalidatesTags: (result, error, arg) => createTag(arg.status, "visitor"),
    }),
  }),
})

export const { useGetVisitorsQuery, useChangeVisitorsMutation } =
  visitorsApiSlice
