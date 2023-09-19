import { apiSlice, baseURl } from "../users/apiSlice";

import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { createTag, createTags } from "../../helpers";
import { TInfoVisitor, TVisitors } from "./types";

export const visitorsApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["visitor"],
  endpoints: (builder) => ({
    getVisitors: builder.query<TVisitors, undefined>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const res = await Promise.all<number[]>([
            fetchWithBQ(baseURl + "/come_event"),
            fetchWithBQ(baseURl + "/skip_event"),
            fetchWithBQ(baseURl + "/wait_answer")
          ]
        )
          const response = res.reduce((acc, cur) => {
            let currKey = Object.keys(cur.data)[0];
            acc[currKey] = cur.data[currKey];
            return acc;
          }, {});

          return { data: response };
        } catch (error: FetchBaseQueryError) {
          return { error: "Request error. Check URI or parameters in request." };
        }
      },
      providesTags: (result, error, arg) =>
        createTags(Object.keys(result), "visitor")
    }),
    changeVisitors: builder.mutation<number[], TInfoVisitor<number[]>>({
      query: (infoVisitor) => ({
        url: `${infoVisitor.status}`,
        method: "PUT",
        body: { [infoVisitor.status]: infoVisitor.data }
      }),
      invalidatesTags: (result, error, arg) => createTag(arg.status, "visitor")
    })
  })
});
