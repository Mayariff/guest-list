import {
  useDeleteVisitor,
  useAddVisitor,
  useSelectedUsers,
} from "./apiVisitorsHooks"
import { visitorsApiSlice } from "./visitorsSlice"
import type { Tstatus, TVisitors } from "./types"
import { status } from "./types"

export const { useGetVisitorsQuery, useChangeVisitorsMutation } =
  visitorsApiSlice
export { status, Tstatus, TVisitors }
export { useDeleteVisitor, useAddVisitor, useSelectedUsers }
