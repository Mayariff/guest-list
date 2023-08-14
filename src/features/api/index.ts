export type TUser = {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

export type TNormalizedRes<T extends { id: number }> = {
  ids: number[]
  entities: { [T.id]: T }
}

export type TGetParams =
  | undefined
  | {
      _page?: number
      _limit?: number
    }

export type TVisitors = {
  come_event: number[]
  skip_event: number[]
}

export enum status {
  visit = "come_event",
  skip = "skip_event",
}
export type TInfoVisitor<T extends number | number[]> = {
  data: T
  status: status
}
export const createTag = (
  res: object & { id: string | number },
  tagName: string,
) => [{ type: tagName, id: res.id }]

export const createTags = (res: number[] | string[], tagName: string) =>
  res.map((el) => ({ type: tagName, id: el }))
