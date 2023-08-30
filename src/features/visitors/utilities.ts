import { Tstatus, TVisitors } from "./types"

export const findStatus = (data: TVisitors, id: number): Tstatus => {
  for (let status in data) {
    if (data[status].includes(id)) return status
  }
}
