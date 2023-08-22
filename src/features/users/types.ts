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
