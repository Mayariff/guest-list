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

export type TStatusCSS = "idle" | "dragStart" | "dragOver" | "dragLeave"

export type TUserItem = {
  user: TUser
  handleDrag: (id: string) => void
  dragCssHandler?: (status: TStatusCSS) => void
}