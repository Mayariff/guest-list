import { status, Tstatus, TVisitors } from "./types"

export const findStatus = (data: TVisitors, id: number): Tstatus => {
  for (let _status in data) {
    if (data[_status].includes(id)) return _status || status.wait
  }
}
