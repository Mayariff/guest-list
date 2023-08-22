export type TVisitors = {
  come_event: number[]
  skip_event: number[]
}

export enum status {
  visit = "come_event",
  skip = "skip_event",
  wait = "wait_answer",
}
export type TInfoVisitor<T extends number | number[]> = {
  data: T
  status: status
}
export type Tboards = status[keyof typeof status] //для dnd  досок используем названия статусов из enum
